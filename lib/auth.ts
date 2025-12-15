import jwt from "jsonwebtoken";

export function signToken(adminId: string) {
  return jwt.sign({ adminId }, process.env.JWT_SECRET!, {
    expiresIn: "12h",
  });
}
