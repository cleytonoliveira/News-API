const { generateHash } = require('../../utils');

exports.seed = async (knex) => {
  const hashedPassword = await generateHash('12345678');
  knex('users')
    .del()
    .then(() => knex('users')
      .insert([
        {
          name: 'Administrator News',
          email: 'adm@news.com',
          password: hashedPassword,
          role: 'admin',
          picture: 'https://i.pravatar.cc/150',
        },
        {
          name: 'User Example',
          email: 'user@mail.com',
          password: hashedPassword,
          role: 'user',
          picture: 'https://i.pravatar.cc/150',
        },
      ]));
};
