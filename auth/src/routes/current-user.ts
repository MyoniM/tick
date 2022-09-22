import express from 'express';

import { currentUser } from '@ymtick/common';

const router = express.Router();

router.get('/currentuser', currentUser, (req, res) => {
  return res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
