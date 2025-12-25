"use client";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";

const SocialButton = () => {
  const params = useSearchParams();
  const handleSignIn = async () => {
    const result = await signIn("google", {
      redirect: false,
      callbackUrl: params.get("callbackUrl") || "/",
    });
    console.log(result);
    if (result.ok) {
      return Swal.fire("success", "welcome", "success");
    } else {
      return Swal.fire("error", "something is wrong", "error");
    }
  };
  return (
    <div>
      <button className="btn" onClick={handleSignIn}>
        Google
      </button>
    </div>
  );
};

export default SocialButton;
