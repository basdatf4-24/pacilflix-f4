import sql from "~/lib/server/db.server";
import { type User } from "./type";

export async function findUserByUsername(
  username: string
): Promise<User | null> {
  let result = await sql`SELECT * FROM PENGGUNA WHERE USERNAME = ${username}`;
  if (result.length === 0) {
    return null;
  }

  let user = result[0] as User;
  return user;
}

export async function createUser(user: User): Promise<User> {
  let result =
    await sql`INSERT INTO PENGGUNA (USERNAME, PASSWORD, NEGARA_ASAL) VALUES (${
      user.username
    }, ${user.password!}, ${
      user.negara_asal
    }) RETURNING (USERNAME, NEGARA_ASAL)`;
  let registered_user = result[0] as User;
  return registered_user;
}
