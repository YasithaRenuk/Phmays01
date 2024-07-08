'use client'
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Clear any previous error message
    setError('');

    // Call signIn function with email and password
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    // Handle signIn result
    if (result?.error) {
      setError(result.error);
    } else {
      // Redirect or perform any other actions upon successful sign-in
      console.log('Successfully signed in');
      router.push('/pages/dashboard');
    }
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center min-h-screen " data-theme="cupcake">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email@example.com"
                className="input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
