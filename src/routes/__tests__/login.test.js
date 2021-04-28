const supertest = require('supertest');
const shell = require('shelljs');

const app = require('../../app');
const { User } = require('../../database/models');

const request = supertest(app);

describe('POST :/api/login', () => {
  beforeEach(() => {
    shell.exec('npx knex migrate:rollback');
    shell.exec('npx knex migrate:latest');
    shell.exec('npx knex seed:run');
  });

  it('should be able to login with successful', async () => {
    const user = await User.query().insert({
      name: 'Teste da Silva',
      email: 'teste@email.com',
      password: '12345678',
      picture: 'https://i.pravatar.cc/150',
    });

    const response = await request.post('/api/login')
      .send({
        email: user.email,
        password: user.password,
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty(['user', 'id']);
    expect(response.body).toHaveProperty(['user', 'email']);
    expect(response.body).toHaveProperty(['user', 'role']);
  });

  it('shouldn\'t be able to login with invalid email', async () => {
    const user = await User.query().insert({
      name: 'Teste da Silva',
      email: 'teste@email.com',
      password: '12345678',
      picture: 'https://i.pravatar.cc/150',
    });

    const response = await request.post('/api/login')
      .send({
        email: 'testedasilva@email.com',
        password: user.password,
      });

    expect(response.statusCode).toEqual(401);
    expect(response.body.message).toBe('Invalid Field');
  });

  it('shouldn\'t be able to login with invalid password', async () => {
    const user = await User.query().insert({
      name: 'Teste da Silva',
      email: 'teste@email.com',
      password: '12345678',
      picture: 'https://i.pravatar.cc/150',
    });

    const response = await request.post('/api/login')
      .send({
        email: user.email,
        password: '123123123',
      });

    expect(response.statusCode).toEqual(401);
    expect(response.body.message).toBe('Invalid Field');
  });
});
