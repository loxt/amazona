import express from 'express';

import User from '../models/user.schema';

const router = express.Router();

router.get('/createadmin', async (req, res) => {
  try {
    const user = new User({
      name: 'Loxt',
      email: 'emannuelloxt@hotmail.com',
      password: '1234',
      isAdmin: true,
    });

    const newUser = await user.save();
    res.send(newUser);
  } catch (e) {
    res.send({ msg: e.message });
  }
})

export default router;