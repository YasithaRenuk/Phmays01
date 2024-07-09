import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from '@/app/lib/mongodb';
import User from '@/app/models/user';
import bcrypt from "bcryptjs";

const handler = NextAuth({
  pages: {
    signIn: '/pages/auth/signin'
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        await connectMongoDB();
        
        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("No user found with the provided email");
        }

        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordCorrect) {
          throw new Error("Password is incorrect");
        }

        // If no error and we have user data, return it
        return {
          id: user._id.toString(),
          email: user.email,
          role: user.role,
        };
      },
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.uid as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.uid = user.id;
        token.role = user.role;
      }
      return token;
    }
  }
});

export { handler as GET, handler as POST };
