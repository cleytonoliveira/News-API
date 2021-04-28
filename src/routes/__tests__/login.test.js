const supertest = require('supertest');
const app = require('../../app');

const { User } = require('../../database/models');

const request = supertest(app);

describe('POST :/api/login', () => {
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
  });
});
