import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  // interface credentials {
  //   id_user: number;
  //   email: string;
  //   password: string;
  //   role: string;
  //   user_name: string;
  // }

  interface Session {
    user: {
      /** The user's postal address. */
      id_user: number,
      email: string,
      password: string,
      role: string,
      user_name: string,
      // address: string
    }
  }
}