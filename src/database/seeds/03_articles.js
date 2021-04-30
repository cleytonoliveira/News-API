exports.seed = (knex) => knex('articles')
  .del()
  .then(() => knex('articles')
    .insert([
      {
        title: 'Article 1',
        category: 'Category 1',
        summary: 'This is a summary of the article 1',
        first_paragraph: '<p>This is the first paragraph of this article 1</p>',
        body: '<div><p>Second paragraph</p><p>Third paragraph</p></div>',
        author_id: 1,
      },
      {
        title: 'Article 2',
        category: 'Category 2',
        summary: 'This is a summary of the article 2',
        first_paragraph: '<p>This is the first paragraph of this article 2</p>',
        body: '<div><p>Second paragraph</p><p>Third paragraph</p></div>',
        author_id: 2,
      },
    ]));
