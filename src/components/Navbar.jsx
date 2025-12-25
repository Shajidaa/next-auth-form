import Link from "next/link";
import React from "react";
import Logout from "./Logout";

const Navbar = () => {
  return (
    <div className="flex justify-center px-2 gap-2.5  items-center container mx-auto">
      <Link className="btn" href={"/"}>
        Home
      </Link>

      <Link className="btn" href={"/register"}>
        Register
      </Link>
      <Logout></Logout>
    </div>
  );
};

export default Navbar;
