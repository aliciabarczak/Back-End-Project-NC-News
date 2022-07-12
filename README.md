# Alicia's NC News

## Back End RESTful API

This API was built during week six of the Northcoders' Full Stack Developer Course and it contains a collection of endpoints to access the database that stores information for NC News - a news aggregation web app modelled by Reddit.

This project aims to demonstrate some of the skills learnt in four weeks of back end study including:

-JavaScript programming
-use of Node.js web application frameworks such as Express
-building a RESTful Web API to respond to HTTP requests
-storing data and interacting with databases using SQL
-Test Driven Development using Supertest

This back end application is consumed by the front end React app created during week nine of the course. Details of the front end may be found on Github: https://github.com/aliciabarczak/NC-News-FE.

## Using NC News

A working example of this API is published at https://nc-news-alicia.herokuapp.com/api which also displays a HTML summary of avalibale API endpoints.

### Creating a Local Copy

These instructions will help you to get a copy of NC News up and running on your local machine.

#### Pre-requiste Software

Ensure you have the following software installed:

- Node.js 17.7.1
- Postgres 14.2

#### Fork, Clone and Install NPM

Fork and clone this repository from: github.com/aliciabarczak/NC-News-BE.

Inside this new directory, install the required npm packages:

```
npm i
```

#### Set up the Environment Variables

Next, in order to create the necessary environment variables:

(1) install `dotenv` as a dev dependency using the following command:

```
npm i -D dotenv
```

(2) use the `.env-example` file to create two .env files for the project: `.env.test` and `.env.development`. The names of each database can be found in `/db/setup.sql`.

(3) double check that `.env.*` is added to the `.gitignore` so that each of the .env files are .gitignored.

(4) run `"setup-dbs"` script command in your terminal to drop/create each of test and development databases.

### Running the Tests

Run these tests using the command:

```
npm run test
```

Results are then displayed for each test in the command line as follows:

```
3. GET /api/topics
    ✓ status 200: responds with an array of topic objects, each of which should have `slug` and `description` properties (1141 ms)
    ✓ 404: responds with route not found (144 ms)
  4. GET /api/articles/:article_id
    ✓ status 200: responds with an article object contaning all 7 properties (250 ms)
    ✓ status 404: responds with "Not Found" when passed an id that does not exist (275 ms)
    ✓ status 400: responds with "Bad Request" when passed an id of invalid type  (169 ms)
  5. PATCH /api/articles/:article_id
    ✓ status 200: increments vote numbers by the number passed in the request and returns an updated article (228 ms)
    ✓ status 404: responds with "Not Found" when passed an id that does not exist (231 ms)
    ✓ status 400: responds with "Bad Request" when passed an id of invalid type  (176 ms)
    ✓ status 200: decrements vote numbers by the number passed in the request and returns an updated article (246 ms)
    ✓ status 400: returns "Bad Request" message when passed malformed request body (210 ms)
    ✓ status 400: returns "Bad Request" message when passed request body without the required key (178 ms)
  6. GET /api/users
    ✓ status 200: responds with an array of objects with username properties only (352 ms)
    ✓ 404: responds with route not found when passed invalid GET ALL route (147 ms)
  7. GET /api/articles/:article_id (comment count)
    ✓ status 200: returns the article response object which new comment_count property (214 ms)
  8. GET /api/articles
    ✓ Status 200: responds with an array of objects contaning all articles. Each article object should include additional "votes" and "comment_count" property (185 ms)
    ✓ Status 404: returns "Not Found" error message when passed invalid path (145 ms)
  9. GET /api/articles/:article_id/comments
    ✓ status 200: returns an array of comments for the given article_id (306 ms)
    ✓ status 400: responds with "Bad Request" when passed an id of invalid type (296 ms)
    ✓ status 404: responds with "Not Found" when passed an id that does not exist (156 ms)
    ✓ status 200: responds with an empty array when the given id exists but has no comments (193 ms)
  10. POST /api/articles/:article_id/comments
    ✓ status 201: should post requested comment from an exisiting user and return the same (139 ms)
    ✓ status 400: responds with "Bad Request" when passed an id of invalid type (203 ms)
    ✓ status 404: responds with "Not Found" when passed an id that does not exist (163 ms)
    ✓ code 400: returns 'Bad Request' error message when passed request body with missing keys (189 ms)
    ✓ code 400: returns 'Bad Request' error message when passed request body with invalid value types (306 ms)
    ✓ code 400: returns 'Bad Request' error message when passed request body with invalid username (1350 ms)
  11. GET /api/articles (queries)
    ✓ status 200: returns the articles sorted by the passed query in descending order by default (200 ms)
    ✓ status 200: returns the articles sorted by the passed query in descending order by default (534 ms)
    ✓ status 400: returns error message when passed invalid sorted by value (168 ms)
    ✓ status 200: articles are sorted by date by default in descending order by default (187 ms)
    ✓ status 200: articles can be sorted by decedning order (203 ms)
    ✓ status 200: articles can be sorted by ascending order (156 ms)
    ✓ status 400: returns error message when passed invalid order value (104 ms)
    ✓ status 200: filters the articles by the topic value specified in the query (145 ms)
    ✓ status 404: return error message when query topic does not exist (102 ms)
    ✓ status 200: return an empty array when query topic exists but has no associated articles (98 ms)
  12. DELETE /api/comments/:comment_id
    ✓ status 204: deletes a given comment by comment_id and responds with an empty response body (139 ms)
    ✓ status 404: responds with "Not Found" when passed an id that does not exist (104 ms)
    ✓ status 400: responds with "Bad Request" when passed an id of invalid type  (139 ms)
  13. GET /api
    ✓ returns json representation of all the available endpoints of the api (312 ms)
```
