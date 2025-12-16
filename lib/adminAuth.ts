import jwt from "jsonwebtoken";

export function verifyAdmin(req: Request) {
  const auth = req.headers.get("authorization");
  if (!auth) throw new Error("Unauthorized");

  const token = auth.replace("Bearer ", "");
  jwt.verify(token, process.env.JWT_SECRET!);
}
