import express from 'express';

import User from '../models/user.schema';
import { getToken } from '../../util';

const router = express.Router();

router.post('/signin', async (req, res) => {
  const signinUser = await User.findOne({
    email: req.body.email,
    password: req.body.password
  });

  if (signinUser) {
    res.send({
      id: signinUser.id,
      name: signinUser.name,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      token: getToken(signinUser)
    })
  } else {
    res.status(401).send({ msg: 'Invalid E-mail or Password' })
  }
});

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
});

export default router;