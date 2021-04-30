const supertest = require('supertest');
const shell = require('shelljs');

const app = require('../../app');

const request = supertest(app);

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
  describe('GET :/api/articles?category=:slug', () => {
    beforeEach(() => {
      shell.exec('npx knex migrate:rollback');
      shell.exec('npx knex migrate:latest');
      shell.exec('npx knex seed:run');
    });

    it('should be able to get article by category with successful', async () => {
      const response = await request.get('/api/articles?category=Category');

      expect(response.statusCode).toEqual(200);
      expect(response.body).toHaveProperty('title', mockResult.title);
      expect(response.body).toHaveProperty('category', mockResult.category);
      expect(response.body).toHaveProperty('summary', mockResult.summary);
    });
  });

  describe('GET :/api/articles/:id', () => {
    beforeEach(() => {
      shell.exec('npx knex migrate:rollback');
      shell.exec('npx knex migrate:latest');
      shell.exec('npx knex seed:run');
    });

    it('should be able to get article without body for anonymous with successful', async () => {
      const response = await request.get('/api/articles/1');

      expect(response.statusCode).toEqual(200);
      expect(response.body).toHaveProperty('title', mockResult[0].title);
      expect(response.body).toHaveProperty('category', mockResult[0].category);
      expect(response.body).toHaveProperty('summary', mockResult[0].summary);
      expect(response.body).toHaveProperty('firstParagraph', mockResult[0].firstParagraph);
      expect(response.body).not.toHaveProperty('body', mockResult[0].body);
    });

    it('should be able to get article with body for logged user with successful', async () => {
      const { body: { token } } = await request.post('/api/login')
        .send({
          email: 'user@mail.com',
          password: '12345678',
        })
        .expect(200);

      const response = await request.get('/api/articles/1')
        .set('Authorization', `${token}`);

      expect(response.statusCode).toEqual(200);
      expect(response.body).toHaveProperty('title', mockResult[0].title);
      expect(response.body).toHaveProperty('category', mockResult[0].category);
      expect(response.body).toHaveProperty('summary', mockResult[0].summary);
      expect(response.body).toHaveProperty('firstParagraph', mockResult[0].firstParagraph);
      expect(response.body).toHaveProperty('body', mockResult[0].body);
    });
  });
});
