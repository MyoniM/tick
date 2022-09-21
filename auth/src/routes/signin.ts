import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { validateRequest } from '../middlewares/validate-request';
import { BadRequestError } from '../errors/bad-request-error';
import { User } from '../models/user';
import { PasswordManager } from '../services/password-manager';

const router = express.Router();

router.post(
  '/signin',
  [
    body('email').isEmail().withMessage('Invalid Email!'),
    body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password length should be b/n 4-20!'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) throw new BadRequestError('Invalid credentials');

    const passwordsMatch = await PasswordManager.compare(existingUser.password, password);
    if (!passwordsMatch) throw new BadRequestError('Invalid credentials');

    const userJwt = jwt.sign({ id: existingUser.id, email: existingUser.email }, process.env.JWT_KEY!);

    req.session = { jwt: userJwt };

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };