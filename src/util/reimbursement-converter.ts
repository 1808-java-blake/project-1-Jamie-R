import { Reimbursement } from "../model/reimbursement";
import { SqlReimbursement } from "../dto/sql-reimbursement";

/**
 * This is used to convert a sql reimbursement into an actual reimbursement
 */
export function reimbursementConverter(reimbursement: SqlReimbursement) {
  return new Reimbursement(reimbursement.reimb_id, reimbursement.reimb_amount, reimbursement.reimb_submitted,
     reimbursement.reimb_resolved, reimbursement.reimb_description, reimbursement.reimb_author, reimbursement.reimb_resolver,
      reimbursement.reimb_status_id, reimbursement.reimb_type_id);
}