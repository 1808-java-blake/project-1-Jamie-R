import { connectionPool } from "../util/connection-util";
import { Reimbursement } from "../model/reimbursement";
import { User } from "../model/user";
import { reimbursementConverter } from "../util/reimbursement-converter";
import { userConverter } from "../util/user-converter";
import { SqlUser } from "../dto/sql-user";

/**
 * Add a new user to the DB
 * @param user 
 */
export async function createUser(user: User): Promise<number> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `INSERT INTO murphys_ers.ers_users 
        (ers_username, ers_password, user_first_name, user_last_name, user_email, user_role_id)
        VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING ers_users_id`, [user.username, user.password, user.firstName, user.lastName, user.email, user.roleId]);
    return resp.rows[0].ers_users_id;
  } finally {
    client.release();
  }
}

export async function findByUserId(ers_users_id: number): Promise<User> {
    const client = await connectionPool.connect();
    try {
      const resp = await client.query(
          'SELECT * FROM murphys_ers.ers_users WHERE ers_users_id = $1', [ers_users_id]);
      let user: SqlUser = resp.rows[0];
      if (user !== undefined) {
        return userConverter(user);
      } else {
        return undefined;
      }
    } finally {
      client.release();
    }
}

export async function findByUsernameAndPassword(username: string, password: string): Promise<User> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `SELECT * FROM murphys_ers.ers_users u
      WHERE u.ers_username = $1
      AND u.ers_password = $2`, [username, password]);
    if(resp.rows.length !== 0) {
      return userConverter(resp.rows[0]); // get the user data from first row
    }
    return null;
} finally {
client.release();
}
}

export async function findAll(): Promise<User[]> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `SELECT * FROM murphys_ers.ers_users`);
      const users = [];
    resp.rows.forEach((element) => {
      const user = userConverter(element);
          users.push(user);
    })
    return users;
  } finally {
    client.release();
  }
}