"use client";

import React from "react";
import { useSession } from "next-auth/react";

const ProfilePage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Not logged in</div>;
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Email: {session.user.email}</p>
    </div>
  );
};

export default ProfilePage;
