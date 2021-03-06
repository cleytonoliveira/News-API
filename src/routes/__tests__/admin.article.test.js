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
    title: 'Article 1',
    category: 'Category 1',
    summary: 'This is a summary of the article 1',
    firstParagraph: '<p>This is the first paragraph of this article 1</p>',
    body: '<div><p>Second paragraph</p><p>Third paragraph</p></div>',
    author: {
      id: 1,
      name: 'First Author',
      picture: 'https://i.pravatar.cc/150',
    },
  },
  {
    id: 2,
    title: 'Article 2',
    category: 'Category 2',
    summary: 'This is a summary of the article 2',
    firstParagraph: '<p>This is the first paragraph of this article 2</p>',
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
          email: 'user@mail.com',
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

    it('shouldn\'t be able to register without title', async () => {
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

    it('shouldn\'t be able to register without category', async () => {
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

    it('shouldn\'t be able to register without summary', async () => {
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

    it('shouldn\'t be able to register without first paragraph', async () => {
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

    it('shouldn\'t be able to register without body', async () => {
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

    it('shouldn\'t be able to register without author id', async () => {
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
          email: 'user@mail.com',
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

    it('should be able to get article by id with successful', async () => {
      const { body: { token } } = await request.post('/api/login')
        .send({
          email: user.email,
          password: user.password,
        })
        .expect(200);

      const response = await request.get('/api/admin/articles/2')
        .set('Authorization', `${token}`);

      expect(response.statusCode).toEqual(200);
      expect(response.body).toStrictEqual(mockResult[1]);
    });

    it('shouldn\'t be able to get article by id if user is not admin', async () => {
      const { body: { token } } = await request.post('/api/login')
        .send({
          email: 'user@mail.com',
          password: '12345678',
        })
        .expect(200);

      const response = await request.get('/api/admin/articles/2')
        .set('Authorization', `${token}`);

      expect(response.statusCode).toEqual(401);
      expect(response.body.message).toBe('Only administrator can access');
    });

    it('shouldn\'t be able to get article by id without token', async () => {
      const response = await request.get('/api/admin/articles/2');

      expect(response.statusCode).toEqual(401);
      expect(response.body.message).toBe('Token not found');
    });

    it('shouldn\'t be able to get article by id with invalid token', async () => {
      const response = await request.get('/api/admin/articles/2')
        .set('Authorization', '9999999999999');

      expect(response.statusCode).toEqual(401);
      expect(response.body.message).toBe('Invalid or expired token');
    });

    it('shouldn\'t be able to get article by id if user does not exist', async () => {
      const { body: { token } } = await request.post('/api/login')
        .send({
          email: user.email,
          password: user.password,
        })
        .expect(200);

      const response = await request.get('/api/admin/articles/999')
        .set('Authorization', `${token}`);

      expect(response.statusCode).toEqual(404);
      expect(response.body.message).toBe('Article not found');
    });
  });

  describe('PUT :/api/admin/articles/:id', () => {
    beforeEach(() => {
      shell.exec('npx knex migrate:rollback');
      shell.exec('npx knex migrate:latest');
      shell.exec('npx knex seed:run');
    });

    it('should be able to update a article with successful', async () => {
      const { body: { token } } = await request.post('/api/login')
        .send({
          email: user.email,
          password: user.password,
        })
        .expect(200);

      const response = await request.put('/api/admin/articles/2')
        .send({
          title: 'My Article Update',
          category: 'Update my Category',
          summary: 'Update this summary of the article with success.',
          firstParagraph: '<p>My paragraph with new update</p>',
          body: '<div><p>Now, I updated the Second paragraph</p><p> Then, I updated the Third paragraph</p></div>',
          authorId: 2,
        })
        .set('Authorization', `${token}`);

      expect(response.statusCode).toEqual(200);
      expect(response.body.id).toBe(2);
      expect(response.body.title).toBe('My Article Update');
      expect(response.body.category).toBe('Update my Category');
      expect(response.body.summary).toBe('Update this summary of the article with success.');
      expect(response.body.firstParagraph).toBe('<p>My paragraph with new update</p>');
      expect(response.body.body).toBe('<div><p>Now, I updated the Second paragraph</p><p> Then, I updated the Third paragraph</p></div>');
      expect(response.body.authorId).toBe(2);
    });

    it('shouldn\'t be able to update article if user is not admin', async () => {
      const { body: { token } } = await request.post('/api/login')
        .send({
          email: 'user@mail.com',
          password: '12345678',
        })
        .expect(200);

      const response = await request.put('/api/admin/articles/2')
        .send({
          title: 'My Article Update',
          category: 'Update my Category',
          summary: 'Update this summary of the article with success.',
          firstParagraph: '<p>My paragraph with new update</p>',
          body: '<div><p>Now, I updated the Second paragraph</p><p> Then, I updated the Third paragraph</p></div>',
          authorId: 2,
        })
        .set('Authorization', `${token}`);

      expect(response.statusCode).toEqual(401);
      expect(response.body.message).toBe('Only administrator can access');
    });

    it('shouldn\'t be able to update article without token', async () => {
      const response = await request.put('/api/admin/articles/2')
        .send({
          title: 'My Article Update',
          category: 'Update my Category',
          summary: 'Update this summary of the article with success.',
          firstParagraph: '<p>My paragraph with new update</p>',
          body: '<div><p>Now, I updated the Second paragraph</p><p> Then, I updated the Third paragraph</p></div>',
          authorId: 2,
        });

      expect(response.statusCode).toEqual(401);
      expect(response.body.message).toBe('Token not found');
    });

    it('shouldn\'t be able to update article with invalid token', async () => {
      const response = await request.put('/api/admin/articles/2')
        .send({
          title: 'My Article Update',
          category: 'Update my Category',
          summary: 'Update this summary of the article with success.',
          firstParagraph: '<p>My paragraph with new update</p>',
          body: '<div><p>Now, I updated the Second paragraph</p><p> Then, I updated the Third paragraph</p></div>',
          authorId: 2,
        })
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

      const response = await request.put('/api/admin/articles/2')
        .send({
          category: 'Update my Category',
          summary: 'Update this summary of the article with success.',
          firstParagraph: '<p>My paragraph with new update</p>',
          body: '<div><p>Now, I updated the Second paragraph</p><p> Then, I updated the Third paragraph</p></div>',
          authorId: 2,
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

      const response = await request.put('/api/admin/articles/2')
        .send({
          title: 'My Article Update',
          summary: 'Update this summary of the article with success.',
          firstParagraph: '<p>My paragraph with new update</p>',
          body: '<div><p>Now, I updated the Second paragraph</p><p> Then, I updated the Third paragraph</p></div>',
          authorId: 2,
        })
        .set('Authorization', `${token}`);

      expect(response.statusCode).toEqual(400);
      expect(response.body.message).toBe('"category" is required');
    });

    it('shouldn\'t be able to update without first paragraph', async () => {
      const { body: { token } } = await request.post('/api/login')
        .send({
          email: user.email,
          password: user.password,
        })
        .expect(200);

      const response = await request.put('/api/admin/articles/2')
        .send({
          title: 'My Article Update',
          category: 'Update my Category',
          summary: 'Update this summary of the article with success.',
          body: '<div><p>Now, I updated the Second paragraph</p><p> Then, I updated the Third paragraph</p></div>',
          authorId: 2,
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

      const response = await request.put('/api/admin/articles/2')
        .send({
          title: 'My Article Update',
          category: 'Update my Category',
          summary: 'Update this summary of the article with success.',
          firstParagraph: '<p>My paragraph with new update</p>',
          authorId: 2,
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

      const response = await request.put('/api/admin/articles/2')
        .send({
          title: 'My Article Update',
          category: 'Update my Category',
          summary: 'Update this summary of the article with success.',
          firstParagraph: '<p>My paragraph with new update</p>',
          body: '<div><p>Now, I updated the Second paragraph</p><p> Then, I updated the Third paragraph</p></div>',
        })
        .set('Authorization', `${token}`);

      expect(response.statusCode).toEqual(400);
      expect(response.body.message).toBe('"authorId" is required');
    });
  });

  describe('DELETE :/api/admin/articles/:id', () => {
    beforeEach(() => {
      shell.exec('npx knex migrate:rollback');
      shell.exec('npx knex migrate:latest');
      shell.exec('npx knex seed:run');
    });

    it('should be able to delete article with successful', async () => {
      const { body: { token } } = await request.post('/api/login')
        .send({
          email: user.email,
          password: user.password,
        })
        .expect(200);

      const response = await request.delete('/api/admin/articles/2')
        .set('Authorization', `${token}`);

      expect(response.statusCode).toEqual(204);
    });

    it('shouldn\'t be able to delete article if user is not admin', async () => {
      const { body: { token } } = await request.post('/api/login')
        .send({
          email: 'user@mail.com',
          password: '12345678',
        })
        .expect(200);

      const response = await request.delete('/api/admin/articles/2')
        .set('Authorization', `${token}`);

      expect(response.statusCode).toEqual(401);
      expect(response.body.message).toBe('Only administrator can access');
    });
  });
});
