import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        username: {},
        password: {},
      },

      async authorize(credentials) {
        if (!credentials) {
          return;
        }

        const url = process.env.NEXT_PUBLIC_API_BASE_URL + "/auth/sign-in";
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
          }),
        });

        console.log("status", res.status);

        if (res.status == 200) {
          const data = await res.json();
          console.log("data", data);

          return data;
        } else {
          console.log("no-data");

          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          accessToken: user.accessToken,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          accessToken: token.accessToken,
        },
      };
    },
  },
  pages: {
    signIn: "/",
  },

  session: {
    strategy: "jwt",
  },
} satisfies NextAuthConfig;
