exports.seed = (knex) => knex('authors')
  .del()
  .then(() => knex('authors')
    .insert([
      {
        name: 'First Author',
        picture: 'https://i.pravatar.cc/150',
      },
      {
        name: 'Second Author',
        picture: 'https://i.pravatar.cc/150',
      },
    ]));
