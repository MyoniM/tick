import request from 'supertest';

import { app } from '../../app';

it('returns 400 with invalid credentials', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@tests.com',
      password: 'passwords',
    })
    .expect(400);
});

it('sets a cookie after successful signin', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});
