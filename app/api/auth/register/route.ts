import { connectMongoDB } from "@/app/lib/mongodb";
import User from "@/app/models/user";
import { ROLES } from "../../../constants/enum";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";

const enumValues = <T extends Record<string, string>>(
  enumObject: T
): [string, ...string[]] => {
  const values = Object.values(enumObject);
  return [values[0], ...values.slice(1)];
};

const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(enumValues(ROLES)),
});

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB(); // Ensure the database connection is established

    const body = await req.json();
    const validity = UserSchema.safeParse(body);

    if (!validity.success) {
      return NextResponse.json(
        { error: validity.error.errors },
        { status: 400 }
      );
    }

    const userExists = await User.findOne({ email: body.email });
    if (userExists) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 401 }
      );
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newUser = {
      email: body.email,
      password: hashedPassword,
      role: body.role,
    };

    await User.create(newUser);

    console.log("User registered successfully:", newUser);
    return NextResponse.json(
      { message: "Registration successful", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration failed:", error);
    return NextResponse.json(
      { message: "Registration failed", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
