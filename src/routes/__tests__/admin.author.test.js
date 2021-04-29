const supertest = require('supertest');
const shell = require('shelljs');

const app = require('../../app');

const request = supertest(app);

const newAuthor = {
  name: 'New User',
  picture: 'https://i.pravatar.cc/150',
};

const user = {
  email: 'adm@news.com',
  password: '12345678',
};

const mockResult = [
  {
    id: 1,
    name: 'First Author',
    picture: 'https://i.pravatar.cc/150',
  },
  {
    id: 2,
    name: 'Second Author',
    picture: 'https://i.pravatar.cc/150',
  },
];

describe('Authors', () => {
  describe('POST :/api/admin/authors', () => {
    beforeEach(() => {
      shell.exec('npx knex migrate:rollback');
      shell.exec('npx knex migrate:latest');
      shell.exec('npx knex seed:run');
    });

    it('should be able to register a new author with successful', async () => {
      const { body: { token } } = await request.post('/api/login')
        .send({
          email: user.email,
          password: user.password,
        })
        .expect(200);

      const response = await request.post('/api/admin/authors')
        .send(newAuthor)
        .set('Authorization', `${token}`);

      expect(response.statusCode).toEqual(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('name', newAuthor.name);
      expect(response.body).toHaveProperty('picture', newAuthor.picture);
    });

    it('shouldn\'t be able to register a new author if user is not admin', async () => {
      const { body: { token } } = await request.post('/api/login')
        .send({
          email: 'first_author@mail.com',
          password: '12345678',
        });

      const response = await request.post('/api/admin/authors')
        .send(newAuthor)
        .set('Authorization', `${token}`);

      expect(response.statusCode).toEqual(401);
      expect(response.body.message).toBe('Only administrator can access');
    });

    it('shouldn\'t be able to register a new author without token', async () => {
      const response = await request.post('/api/admin/authors')
        .send(newAuthor);

      expect(response.statusCode).toEqual(401);
      expect(response.body.message).toBe('Token not found');
    });

    it('shouldn\'t be able to register a new author with invalid token', async () => {
      const response = await request.post('/api/admin/authors')
        .send(newAuthor)
        .set('Authorization', '9999999999999');

      expect(response.statusCode).toEqual(401);
      expect(response.body.message).toBe('Invalid or expired token');
    });
  });

  describe('GET :/api/admin/authors', () => {
    beforeEach(() => {
      shell.exec('npx knex migrate:rollback');
      shell.exec('npx knex migrate:latest');
      shell.exec('npx knex seed:run');
    });

    it('should be able to get all authors with successful', async () => {
      const { body: { token } } = await request.post('/api/login')
        .send({
          email: user.email,
          password: user.password,
        })
        .expect(200);

      const response = await request.get('/api/admin/authors')
        .send(newAuthor)
        .set('Authorization', `${token}`);

      expect(response.statusCode).toEqual(200);
      expect(response.body).toStrictEqual(mockResult);
    });

    it('shouldn\'t be able to get all authors if user is not admin', async () => {
      const { body: { token } } = await request.post('/api/login')
        .send({
          email: 'first_author@mail.com',
          password: '12345678',
        });

      const response = await request.get('/api/admin/authors')
        .set('Authorization', `${token}`);

      expect(response.statusCode).toEqual(401);
      expect(response.body.message).toBe('Only administrator can access');
    });
  });
});
