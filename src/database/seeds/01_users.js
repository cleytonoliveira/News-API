exports.seed = (knex) => knex('users')
  .del()
  .then(() => knex('users')
    .insert([
      {
        name: 'Administrator News',
        email: 'adm@news.com',
        password: '12345678',
        role: 'admin',
        picture: 'https://i.pravatar.cc/150',
      },
      {
        name: 'User Example',
        email: 'user@mail.com',
        password: '12345678',
        role: 'user',
        picture: 'https://i.pravatar.cc/150',
      },
    ]));
