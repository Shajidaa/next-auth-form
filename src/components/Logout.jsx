"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Logout = () => {
  const session = useSession();
  console.log(session);

  return (
    <>
      {session.status == "authenticated" ? (
        <>
          {" "}
          <button onClick={() => signOut()} className="btn">
            LogOut
          </button>{" "}
          <Link className="btn" href={"/profile"}>
            Profile
          </Link>
        </>
      ) : (
        <>
          <Link href={"/login"} className="btn">
            LogIn
          </Link>
        </>
      )}
    </>
  );
};

export default Logout;
