import { cookies } from "next/headers";

const ADMINS = [
  {
    email: process.env.ADMIN_EMAIL_1,
    password: process.env.ADMIN_PASSWORD_1
  },
  {
    email: process.env.ADMIN_EMAIL_2,
    password: process.env.ADMIN_PASSWORD_2
  }
];

export function authenticateAdmin(email: string, password: string) {
  return ADMINS.find(
    (a) => a.email === email && a.password === password
  );
}

export function setAdminSession(email: string) {
  cookies().set("admin_session", email, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/"
  });
}

export function getAdminSession() {
  return cookies().get("admin_session")?.value;
}

export function clearAdminSession() {
  cookies().delete("admin_session");
}
