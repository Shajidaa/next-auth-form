"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import SocialButton from "./SocialButton";

const LoginForm = () => {
  const router = useRouter();
  const params = useSearchParams();
  // const callback = params.get("callbackUrl");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      // callbackUrl: params.get("callbackUrl" || "/"),
    });
    console.log("sdfkdf", result);

    if (result?.error) {
      alert("Login failed: " + result.error);
    } else {
      alert("Login successful!");

      // router.push("/");
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
          <SocialButton></SocialButton>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
