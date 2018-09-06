import { Request, Response } from 'express';
import express from 'express';
import * as reimbursementDao from '../dao/reimbursement-dao';

// all routes defined with this object will imply /reimbursement
export const reimbursementRouter = express.Router(); // routers represent a subset of routes for the express application


/**
 * Find all reimbursements
 */
reimbursementRouter.get('', [ 
  async (req: Request, resp: Response) => {
    try {
      console.log('retrieving all reimbursements');
      let reimbursement = await reimbursementDao.findAll();
      resp.json(reimbursement);
    } catch (err) {
      resp.sendStatus(500);
    }
  }]);

/**
 * Find reimbursements by user id
 */
reimbursementRouter.get('/:reimbAuthor', async (req, resp) => {
  const reimbAuthor = +req.params.reimbAuthor; // convert the id to a number
  console.log(`retreiving reimbursements with author id  ${reimbAuthor}`)
  try {
    let reimbursement = await reimbursementDao.findByAuthorId(reimbAuthor);
    if (reimbursement !== undefined) {
      resp.json(reimbursement);
    } else {
      resp.sendStatus(400);
    }
  } catch (err) {
    console.log(err);
    resp.sendStatus(500);
  }
});


/**
 * Create reimbursement
 */
reimbursementRouter.post('', [
  async (req, resp) => {
    try {
      const id = await reimbursementDao.createReimbursement(req.body);
      resp.status(201);
      resp.json(id);
    } catch (err) {
      console.log(err);
      resp.sendStatus(500);
    }
  }])

