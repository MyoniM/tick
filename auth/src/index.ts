import mongoose from 'mongoose';

import { app } from './app';

const start = async () => {
  if (!process.env.JWT_KEY) throw new Error('JWT_KEY is not defined');

  try {
    await mongoose.connect('mongodb://auth-mongo-svc:27017/auth');
  } catch (error) {
    console.log('Error connecting to mongo db', error);
  }

  app.listen(3000, () => {
    console.log('Listening on PORT: 3000');
  });
};

start();
