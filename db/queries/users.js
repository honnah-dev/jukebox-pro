import db from "#db/client";
import bcrypt from "bcrypt";

export async function createUser(email, password) {
  const sql = `
  INSERT INTO users
  (email, password)
  VALUES
  ($1, $2)
  RETURNING *
  `;
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const {
    rows: [user],
  } = await db.query(sql, [email, hashedPassword]);
  return user;
}