import mongoose from 'mongoose';

import { app } from './app';

const start = async () => {
  if (!process.env.JWT_KEY) throw new Error('JWT_KEY is not defined');
  if (!process.env.MONGO_URI) throw new Error('MONGO_URI is not defined');

  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.log('Error connecting to mongo db', error);
  }

  app.listen(3000, () => {
    console.log('Listening on PORT: 3000');
  });
};

start();
