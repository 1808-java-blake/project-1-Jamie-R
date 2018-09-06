import { Reimbursement } from "./reimbursement";

export class User {
    userId = 0;
    username = '';
    password = '';
    firstName = '';
    lastName = '';
    email = '';
    roleId = 0;
    // reimbursements: Reimbursement[] = [];
  
    constructor(userId?: number, username?: string, password?: string, firstName?: string, lastName?: string, email?: string,
         roleId?: number, reimbursements?: Reimbursement[]) {
      userId && (this.userId = userId);
      username && (this.username = username);
      password && (this.password = password);
      firstName && (this.firstName = firstName);
      lastName && (this.lastName = lastName);
      email && (this.email = email);
      roleId && (this.roleId = roleId);
      // reimbursements && (this.reimbursements = reimbursements);
    }
  }