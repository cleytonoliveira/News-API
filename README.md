# News API - Node.js Challenge - Jungle Devs

Project developed by Cleyton Oliveira, as a technical challenge from Jungle Devs. The purpose was implemented a simplified version os news provider API.

## Used Techs:
---

- Node.js
- Objection.js
- PostgreSQL
- Express
- Express Rescue
- Supertest
- Jest
- Joi
- Boom
- JWT
- ESLint
## How to start the project
---

### Installation and Setup Instructions

Project configured to use Node `v12.20.0`.

1. Clone with `git clone`
2. Install dependencies with `yarn install`
3. Create database, tables and populate with `yarn run prestart`
4. Run the project with `yarn run dev`

## How to create a production project
---
Before you can host a api externally you're first going to have to:

- Choose an environment for hosting the Express app.
- Make a few changes to your project settings.
- Set up a production-level infrastructure for serving your api.

See the about the [deployment](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment) to learn more.

## Feedbacks and final thoughts
---

I so glad to built this project. It was a opportunity to learned a [Objection.js](https://vincit.github.io/objection.js/) and PostgreSQL, moreover it was opportunity to make a integration test with Jest for the most part of the API.

Althouth made this [blog API](https://github.com/cleytonoliveira/blogs-api) with some similarities. I liked the oppotunity to choose and learn another away to code.

I tried to keep the code in a good level with single responsability principle and think to make easier to change or maintain the application with the Architecture.

---

<details>
  <summary>Click to see the base of purpose!</summary>

# Jungle Devs - Node Challenge #001

## Description

**Challenge goal**: The purpose of this challenge is to give an overall understanding of a backend application. You’ll be implementing a simplified version of news provider API. The concepts that you’re going to apply are:

- REST architecture;
- Authentication and permissions;
- Data modeling and migrations;
- SQL database;
- Query optimization;
- Serialization;
- Production builds.

**Target level**: This is an all around challenge that cover both juniors and experience devs based on the depth of how the concepts were applied.

**Final accomplishment**: By the end of this challenge you’ll have a production ready API.

## Acceptance criteria

- Clear instructions on how to run the application in development mode
- Clear instructions on how to create production builds
- A good API documentation or collection
- Models created using [Objection.js](https://vincit.github.io/objection.js/)
- Login API: `/api/login`
- Sign-up API: `/api/sign-up`
- Administrator restricted APIs:
  - CRUD `/api/admin/authors`
  - CRUD `/api/admin/articles`
- List article endpoint `/api/articles?category=:slug` with the following response:
```json
[
  {
    "author": {
      "name": "Author Name",
      "picture": "https://picture.url"
    },
    "category": "Category",
    "title": "Article title",
    "summary": "This is a summary of the article"
  },
  ...
]
```
- Article detail endpoint `/api/articles/:id` with different responses for anonymous and logged users:

    **Anonymous**
    ```json
    {
      "author": {
        "name": "Author Name",
        "picture": "https://picture.url"
      },
      "category": "Category",
      "title": "Article title",
      "summary": "This is a summary of the article",
      "firstParagraph": "<p>This is the first paragraph of this article</p>"
    }
    ```

    **Logged user**
    ```json
    {
      "author": {
        "name": "Author Name",
        "picture": "https://picture.url"
      },
      "category": "Category",
      "title": "Article title",
      "summary": "This is a summary of the article",
      "firstParagraph": "<p>This is the first paragraph of this article</p>",
      "body": "<div><p>Second paragraph</p><p>Third paragraph</p></div>"
    }
    ```


## Instructions to Run

- Database: `docker-compose up` will start the PostgreSQL DB
- `yarn dev` is configured to start the app.js using nodemon
</details>
