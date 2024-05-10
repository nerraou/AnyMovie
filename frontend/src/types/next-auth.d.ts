import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface DefaultUser {
    accessToken: string;
  }
  interface Session extends DefaultSession {
    user: {
      accessToken: string | unknown;
    } & DefaultSession["user"];
  }

  interface Jwt extends DefaultJWT {
    user: {
      accessToken: string | unknown;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    accessToken: string | unknown;
  }
}
