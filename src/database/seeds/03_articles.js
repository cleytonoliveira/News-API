exports.seed = (knex) => knex('articles')
  .del()
  .then(() => knex('articles')
    .insert([
      {
        title: 'Article',
        category: 'Category',
        summary: 'This is a summary of the article',
        first_paragraph: '<p>This is the first paragraph of this article</p>',
        body: '<div><p>Second paragraph</p><p>Third paragraph</p></div>',
        author_id: 1,
      },
      {
        title: 'Article',
        category: 'Category',
        summary: 'This is a summary of the article',
        first_paragraph: '<p>This is the first paragraph of this article</p>',
        body: '<div><p>Second paragraph</p><p>Third paragraph</p></div>',
        author_id: 2,
      },
    ]));
