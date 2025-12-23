"use client";
import { loginUser } from "@/action/server/auth";
import Link from "next/link";

const LoginForm = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    const result = await loginUser({
      email,
      password,
      redirect: false,
    });
    console.log(result);

    if (result) {
      alert("login done");
    } else {
      alert("something is wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-sm shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered w-full"
              required
            />

            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            Don’t have an account?{" "}
            <Link href={`/register`} className="link link-primary">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
