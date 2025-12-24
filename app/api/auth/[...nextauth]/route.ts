import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/lib/db";
import User from "@/models/User";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      await dbConnect();

      const existing = await User.findOne({ email: user.email });

      if (!existing) {
        await User.create({
          name: user.name,
          email: user.email,
          provider: "google",
        });
      }

      return true;
    },
  },
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
