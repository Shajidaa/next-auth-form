"use server";
import { collections, connect } from "@/lib/dbConntect";
// import { collections, connect } from "@/lib/dbConnect";
// import { collections, dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

export const postUser = async (payload) => {
  const { email, password, name, bloodgroup, contactNo, image } = payload;
  if (!email || !password) {
    return {
      success: false,
    };
  }
  const isExist = await connect(collections.USERS).findOne({ email });
  if (isExist) {
    return {
      success: false,
    };
  }
  const newUser = {
    provider: "credentials",
    name,
    email,
    bloodgroup,
    contactNo,
    image,
    password: await bcrypt.hash(password, 14),
    role: "user",
  };

  const result = await connect(collections.USERS).insertOne(newUser);
  return {
    ...result,
    insertedId: result.insertedId?.toString(),
  };
};
export const loginUser = async (payload) => {
  const { email, password } = payload;
  if (!email || !password) {
    return null;
  }
  const user = await connect(collections.USERS).findOne({ email });
  if (!user) {
    return null;
  }
  const isMatched = await bcrypt.compare(password, user?.password);
  if (isMatched) {
    return {
      ...user,
      insertedId: user.insertedId?.toString(),
    };
  }
  return null;
};
