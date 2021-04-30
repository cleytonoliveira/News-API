const supertest = require('supertest');
const shell = require('shelljs');

const app = require('../../app');

const request = supertest(app);

const user = {
  name: 'New User',
  email: 'newuser@email.com',
  password: '12345678',
  picture: 'https://i.pravatar.cc/150',
};

describe('User Sign-up', () => {
  describe('POST :/api/sign-up', () => {
    beforeEach(() => {
      shell.exec('npx knex migrate:rollback');
      shell.exec('npx knex migrate:latest');
      shell.exec('npx knex seed:run');
    });

    it('should be able to register a new user with successful', async () => {
      const response = await request.post('/api/sign-up')
        .send(user);

      expect(response.statusCode).toEqual(201);
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty(['user', 'id']);
      expect(response.body).toHaveProperty(['user', 'email']);
      expect(response.body).toHaveProperty(['user', 'name']);
    });

    it('shouldn\'t be able to register with invalid name', async () => {
      const response = await request.post('/api/sign-up')
        .send({
          name: 'Teste',
          email: user.email,
          password: user.password,
          picture: user.picture,
        });

      expect(response.statusCode).toEqual(400);
      expect(response.body.message).toBe('"name" length must be at least 8 characters long');
    });

    it('shouldn\'t be able to register without name', async () => {
      const response = await request.post('/api/sign-up')
        .send({
          email: user.email,
          password: user.password,
          picture: user.picture,
        });

      expect(response.statusCode).toEqual(400);
      expect(response.body.message).toBe('"name" is required');
    });

    it('shouldn\'t be able to register with invalid email', async () => {
      const response = await request.post('/api/sign-up')
        .send({
          name: user.name,
          email: '@mail.com',
          password: user.password,
          picture: user.picture,
        });

      expect(response.statusCode).toEqual(400);
      expect(response.body.message).toBe('"email" must be a valid email');
    });

    it('shouldn\'t be able to register without email', async () => {
      const response = await request.post('/api/sign-up')
        .send({
          name: user.name,
          password: user.password,
          picture: user.picture,
        });

      expect(response.statusCode).toEqual(400);
      expect(response.body.message).toBe('"email" is required');
    });

    it('shouldn\'t be able to register with invalid password', async () => {
      const response = await request.post('/api/sign-up')
        .send({
          name: user.name,
          email: user.email,
          password: '1234',
          picture: user.picture,
        });

      expect(response.statusCode).toEqual(400);
      expect(response.body.message).toBe('"password" length must be at least 6 characters long');
    });

    it('shouldn\'t be able to register without password', async () => {
      const response = await request.post('/api/sign-up')
        .send({
          name: user.name,
          email: user.email,
          picture: user.picture,
        });

      expect(response.statusCode).toEqual(400);
      expect(response.body.message).toBe('"password" is required');
    });

    it('shouldn\'t be able to register with email already registered in database', async () => {
      await request.post('/api/sign-up')
        .send(user)
        .expect(201);

      const response = await request.post('/api/sign-up')
        .send(user);

      expect(response.statusCode).toEqual(409);
      expect(response.body.message).toBe('Email already registered.');
    });
  });
});
