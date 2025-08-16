"use server";

import jwt from "jsonwebtoken";

export const checkAuth = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Valid token:", decoded);
    return decoded;
  } catch (err) {
    console.error("Invalid token:", err.message);
    return null;
  }
};
