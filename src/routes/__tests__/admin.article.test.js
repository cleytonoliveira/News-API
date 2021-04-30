const supertest = require('supertest');
const shell = require('shelljs');

const app = require('../../app');

const request = supertest(app);

const newArticle = {
  title: 'My new Article',
  category: 'Cool Category',
  summary: 'I have a new summary of the article now.',
  firstParagraph: '<p>Let\'s change this first paragraph of this article</p>',
  body: '<div><p>Now, I\'m the Second paragraph</p><p> Then, I\'m the Third paragraph</p></div>',
  authorId: 1,
};

const user = {
  email: 'adm@news.com',
  password: '12345678',
};

const mockResult = [
  {
    id: 1,
    title: 'Article',
    category: 'Category',
    summary: 'This is a summary of the article',
    firstParagraph: '<p>This is the first paragraph of this article</p>',
    body: '<div><p>Second paragraph</p><p>Third paragraph</p></div>',
    author: {
      id: 1,
      name: 'First Author',
      picture: 'https://i.pravatar.cc/150',
    },
  },
  {
    id: 2,
    title: 'Article',
    category: 'Category',
    summary: 'This is a summary of the article',
    firstParagraph: '<p>This is the first paragraph of this article</p>',
    body: '<div><p>Second paragraph</p><p>Third paragraph</p></div>',
    author: {
      id: 2,
      name: 'Second Author',
      picture: 'https://i.pravatar.cc/150',
    },
  },
];

describe('Articles', () => {
  describe('POST :/api/admin/articles', () => {
    beforeEach(() => {
      shell.exec('npx knex migrate:rollback');
      shell.exec('npx knex migrate:latest');
      shell.exec('npx knex seed:run');
    });

    it('should be able to register a new article with successful', async () => {
      const { body: { token } } = await request.post('/api/login')
        .send({
          email: user.email,
          password: user.password,
        })
        .expect(200);

      const response = await request.post('/api/admin/articles')
        .send(newArticle)
        .set('Authorization', `${token}`);

      expect(response.statusCode).toEqual(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('title', newArticle.title);
      expect(response.body).toHaveProperty('category', newArticle.category);
      expect(response.body).toHaveProperty('summary', newArticle.summary);
      expect(response.body).toHaveProperty('firstParagraph', newArticle.firstParagraph);
      expect(response.body).toHaveProperty('body', newArticle.body);
    });

    it('shouldn\'t be able to register a new article if user is not admin', async () => {
      const { body: { token } } = await request.post('/api/login')
        .send({
          email: 'first_author@mail.com',
          password: '12345678',
        })
        .expect(200);

      const response = await request.post('/api/admin/articles')
        .send(newArticle)
        .set('Authorization', `${token}`);

      expect(response.statusCode).toEqual(401);
      expect(response.body.message).toBe('Only administrator can access');
    });

    it('shouldn\'t be able to register a new article without token', async () => {
      const response = await request.post('/api/admin/articles')
        .send(newArticle);

      expect(response.statusCode).toEqual(401);
      expect(response.body.message).toBe('Token not found');
    });

    it('shouldn\'t be able to register a new article with invalid token', async () => {
      const response = await request.post('/api/admin/articles')
        .send(newArticle)
        .set('Authorization', '9999999999999');

      expect(response.statusCode).toEqual(401);
      expect(response.body.message).toBe('Invalid or expired token');
    });

    it('shouldn\'t be able to update without title', async () => {
      const { body: { token } } = await request.post('/api/login')
        .send({
          email: user.email,
          password: user.password,
        })
        .expect(200);

      const response = await request.post('/api/admin/articles')
        .send({
          category: newArticle.category,
          summary: newArticle.summary,
          firstParagraph: newArticle.firstParagraph,
          body: newArticle.body,
          authorId: newArticle.authorId,
        })
        .set('Authorization', `${token}`);

      expect(response.statusCode).toEqual(400);
      expect(response.body.message).toBe('"title" is required');
    });

    it('shouldn\'t be able to update without category', async () => {
      const { body: { token } } = await request.post('/api/login')
        .send({
          email: user.email,
          password: user.password,
        })
        .expect(200);

      const response = await request.post('/api/admin/articles')
        .send({
          title: newArticle.title,
          summary: newArticle.summary,
          firstParagraph: newArticle.firstParagraph,
          body: newArticle.body,
          authorId: newArticle.authorId,
        })
        .set('Authorization', `${token}`);

      expect(response.statusCode).toEqual(400);
      expect(response.body.message).toBe('"category" is required');
    });

    it('shouldn\'t be able to update without summary', async () => {
      const { body: { token } } = await request.post('/api/login')
        .send({
          email: user.email,
          password: user.password,
        })
        .expect(200);

      const response = await request.post('/api/admin/articles')
        .send({
          title: newArticle.title,
          category: newArticle.category,
          firstParagraph: newArticle.firstParagraph,
          body: newArticle.body,
          authorId: newArticle.authorId,
        })
        .set('Authorization', `${token}`);

      expect(response.statusCode).toEqual(400);
      expect(response.body.message).toBe('"summary" is required');
    });

    it('shouldn\'t be able to update without first paragraph', async () => {
      const { body: { token } } = await request.post('/api/login')
        .send({
          email: user.email,
          password: user.password,
        })
        .expect(200);

      const response = await request.post('/api/admin/articles')
        .send({
          title: newArticle.title,
          category: newArticle.category,
          summary: newArticle.summary,
          body: newArticle.body,
          authorId: newArticle.authorId,
        })
        .set('Authorization', `${token}`);

      expect(response.statusCode).toEqual(400);
      expect(response.body.message).toBe('"firstParagraph" is required');
    });

    it('shouldn\'t be able to update without body', async () => {
      const { body: { token } } = await request.post('/api/login')
        .send({
          email: user.email,
          password: user.password,
        })
        .expect(200);

      const response = await request.post('/api/admin/articles')
        .send({
          title: newArticle.title,
          category: newArticle.category,
          summary: newArticle.summary,
          firstParagraph: newArticle.firstParagraph,
          authorId: newArticle.authorId,
        })
        .set('Authorization', `${token}`);

      expect(response.statusCode).toEqual(400);
      expect(response.body.message).toBe('"body" is required');
    });

    it('shouldn\'t be able to update without author id', async () => {
      const { body: { token } } = await request.post('/api/login')
        .send({
          email: user.email,
          password: user.password,
        })
        .expect(200);

      const response = await request.post('/api/admin/articles')
        .send({
          title: newArticle.title,
          category: newArticle.category,
          summary: newArticle.summary,
          firstParagraph: newArticle.firstParagraph,
          body: newArticle.body,
        })
        .set('Authorization', `${token}`);

      expect(response.statusCode).toEqual(400);
      expect(response.body.message).toBe('"authorId" is required');
    });
  });

  describe('GET :/api/admin/articles', () => {
    beforeEach(() => {
      shell.exec('npx knex migrate:rollback');
      shell.exec('npx knex migrate:latest');
      shell.exec('npx knex seed:run');
    });

    it('should be able to get all articles with successful', async () => {
      const { body: { token } } = await request.post('/api/login')
        .send({
          email: user.email,
          password: user.password,
        })
        .expect(200);

      const response = await request.get('/api/admin/articles')
        .set('Authorization', `${token}`);

      expect(response.statusCode).toEqual(200);
      expect(response.body).toStrictEqual(mockResult);
    });

    it('shouldn\'t be able to get all articles if user is not admin', async () => {
      const { body: { token } } = await request.post('/api/login')
        .send({
          email: 'first_author@mail.com',
          password: '12345678',
        })
        .expect(200);

      const response = await request.get('/api/admin/articles')
        .set('Authorization', `${token}`);

      expect(response.statusCode).toEqual(401);
      expect(response.body.message).toBe('Only administrator can access');
    });

    it('shouldn\'t be able to get all articles without token', async () => {
      const response = await request.get('/api/admin/articles');

      expect(response.statusCode).toEqual(401);
      expect(response.body.message).toBe('Token not found');
    });

    it('shouldn\'t be able to get all articles with invalid token', async () => {
      const response = await request.get('/api/admin/articles')
        .set('Authorization', '9999999999999');

      expect(response.statusCode).toEqual(401);
      expect(response.body.message).toBe('Invalid or expired token');
    });
  });

  describe('GET :/api/admin/articles/:id', () => {
    beforeEach(() => {
      shell.exec('npx knex migrate:rollback');
      shell.exec('npx knex migrate:latest');
      shell.exec('npx knex seed:run');
    });
  });

  describe('PUT :/api/admin/articles/:id', () => {
    beforeEach(() => {
      shell.exec('npx knex migrate:rollback');
      shell.exec('npx knex migrate:latest');
      shell.exec('npx knex seed:run');
    });
  });

  describe('DELETE :/api/admin/articles/:id', () => {
    beforeEach(() => {
      shell.exec('npx knex migrate:rollback');
      shell.exec('npx knex migrate:latest');
      shell.exec('npx knex seed:run');
    });
  });
});
