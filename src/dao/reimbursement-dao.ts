import { connectionPool } from "../util/connection-util";
import { Reimbursement } from "../model/reimbursement";
import { User } from "../model/user";
import { reimbursementConverter } from "../util/reimbursement-converter";
import { userConverter } from "../util/user-converter";
import { SqlReimbursement } from "../dto/sql-reimbursement";

/**
 * Add a new reimbursement to the DB
 * @param reimbursement 
 */
export async function createReimbursement(reimbursement: Reimbursement): Promise<number> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `INSERT INTO murphys_ers.ers_reimbursement 
        (reimb_amount, reimb_submitted, reimb_resolved, reimb_description, reimb_author,
        reimb_resolver, reimb_status_id, reimb_type_id)
        VALUES ($1, $2, null, $3, $4, null, 3, $5) 
        RETURNING reimb_id`, [reimbursement.reimbAmount, reimbursement.reimbSubmitted,
      reimbursement.reimbDescription, reimbursement.reimbAuthor, reimbursement.reimbTypeId]);
    return resp.rows[0].reimb_id;
  } finally {
    client.release();
  }
}

/**
 * Retreive all reimbursements from the database
 */
export async function findAll(): Promise<Reimbursement[]> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query('SELECT * FROM murphys_ers.ers_reimbursement');
    return resp.rows.map(reimbursementConverter);
  } finally {
    client.release();
  }
}

/**
* Retreive reimbursements from the database made by one employee (by their ID)
*/
export async function findByAuthorId(reimb_author: number): Promise<Reimbursement[]> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      'SELECT * FROM murphys_ers.ers_reimbursement WHERE reimb_author = $1', [reimb_author]);
    const reimbursements = [];
    resp.rows.forEach((element) => {
      const reimbursement = reimbursementConverter(element);
      reimbursements.push(reimbursement);
    })
    return reimbursements;
  } finally {
    client.release();
  }
}

/**
* update the status of a reimbursement
*/
export async function updateStatus(reimbursement: Reimbursement): Promise<number> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `UPDATE murphys_ers.ers_reimbursement 
       SET reimb_status_id = $1, reimb_resolved = CURRENT_DATE, reimb_resolver = $2
       WHERE reimb_id = $3;`, [reimbursement.reimbStatusId, reimbursement.reimbResolver, reimbursement.reimbId]);
    return resp.rows[0];
  } finally {
    client.release();
  }
}