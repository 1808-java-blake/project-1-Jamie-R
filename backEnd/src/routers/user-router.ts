import { Request, Response } from 'express';
import express from 'express';
import * as userDao from '../dao/user-dao';

// all routes defined with this object will imply /users
export const userRouter = express.Router(); // routers represent a subset of routes for the express application

/**
 * Find all users
 */
userRouter.get('', async (req: Request, resp: Response) => {
  try {
    console.log('retrieving all users');
    let users = await userDao.findAll();
    resp.json(users);
  } catch (err) {
    console.log(err);
    resp.sendStatus(500);
  }
});

/**
 * Find user by id
 */
userRouter.get('/:userId', async (req, resp) => {
  const userId = +req.params.userId; // convert the id to a number
  console.log(`retreiving user with id ${userId}`)
  try {
    let user = await userDao.findByUserId(userId);
    if (user !== undefined) {
      resp.json(user);
    } else {
      resp.sendStatus(400);
    }
  } catch (err) {
    resp.sendStatus(500);
  }
});

/**
 * Add a new user
 */
userRouter.post('', async (req, resp) => {
  console.log('creating user')
  try {
    const userId = await userDao.createUser(req.body);
    resp.status(201);
    resp.json(userId);
  } catch (err) {
    console.log(err);
    resp.sendStatus(500);
  }
})