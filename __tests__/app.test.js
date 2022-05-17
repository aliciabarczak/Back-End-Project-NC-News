process.env.NODE_ENV = "test";
const request = require('supertest');
const app = require('../app');
const db = require('../db/connection');
const seed = require("./../db/seeds/seed");
const testData = require("./../db/data/test-data");


beforeEach(() => {
    return seed(testData);
  });

afterAll(() => {
    if (db.end) db.end();
  });
  
describe("3. GET /api/topics", () => {
      test("status 200: responds with an array of topic objects, each of which should have `slug` and `description` properties", () => {
        return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({body : { topics }}) => {
            expect(topics).toHaveLength(3); 
            topics.forEach((topic) => {
                expect(topic).toEqual(
                    expect.objectContaining({
                        description: expect.any(String), 
                        slug: expect.any(String)
                    })
                )
            })
        })
      })
      test("404: responds with route not found", () => {
          return request(app)
          .get("/api/bananas")
          .expect(404)
          .then(({body: {msg}}) => {
            expect(msg).toBe("Not Found")
          })
      })
  });

  describe("4. GET /api/articles/:article_id", () => {
    test("status 200: responds with an article object contaning all 7 properties", () => {
      return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({body : { article }}) => {
          expect(article).toEqual({
              author: "butter_bridge",
              title: "Living in the shadow of a great man",
              article_id: 1,
              body: "I find this existence challenging",
              topic: "mitch",
              created_at: "2020-07-09T20:11:00.000Z",
              votes: 100,
          })
        })
     });  
    test('status 404: responds with "Not Found" when passed an id that does not exist', () => {
      return request(app)
      .get("/api/articles/333333333")
      .expect(404)
      .then(({body: {msg}}) => {
        expect(msg).toBe("Not Found")
      })
     }); 
     test('status 400: responds with "Bad Request" when passed an id of invalid type ', () => {
       return request(app)
       .get("/api/articles/sloth")
       .expect(400)
       .then (({body: {msg}}) => {
         expect(msg).toBe("Bad Request")
       })
     });
  });

  describe("5. PATCH /api/articles/:article_id",() => {
    test('status 200: increments vote numbers by the number passed in the request and returns an updated article', () => {
      const newIncrementedVotes = { inc_votes : 1 };
      return request(app)
      .patch("/api/articles/1")
      .send(newIncrementedVotes)
      .expect(200)
      .then(({body : { updatedArticle }}) => {
        expect(updatedArticle).toEqual({
          author: "butter_bridge",
          title: "Living in the shadow of a great man",
          article_id: 1,
          body: "I find this existence challenging",
          topic: "mitch",
          created_at: "2020-07-09T20:11:00.000Z",
          votes: 101,
        })
    })
  });

  test('status 404: responds with "Not Found" when passed an id that does not exist', () => {
    const newIncrementedVotes = { inc_votes : 1 };
    return request(app)
    .patch("/api/articles/1111111")
    .send(newIncrementedVotes)
    .expect(404)
    .then(({body: {msg}}) => {
      expect(msg).toBe("Not Found")
    })
   }); 
   test('status 400: responds with "Bad Request" when passed an id of invalid type ', () => {
    const newIncrementedVotes = { inc_votes : 1 };
     return request(app)
     .patch("/api/articles/sloth")
     .send(newIncrementedVotes)
     .expect(400)
     .then (({body: {msg}}) => {
       expect(msg).toBe("Bad Request")
     })
   });
});
test('status 200: decrements vote numbers by the number passed in the request and returns an updated article', () => {
  const newDecrementedVotes = { inc_votes : -50 };
  return request(app)
  .patch("/api/articles/1")
  .send(newDecrementedVotes)
  .expect(200)
  .then(({body : { updatedArticle }}) => {
    expect(updatedArticle).toEqual({
      author: "butter_bridge",
      title: "Living in the shadow of a great man",
      article_id: 1,
      body: "I find this existence challenging",
      topic: "mitch",
      created_at: "2020-07-09T20:11:00.000Z",
      votes: 50,
     })
    })
  });
  test('status 400: returns "Bad Request" message when passed malformed request body', () => {
    const requestBody = { inc_votes : "five" }; 
    return request(app)
       .patch("/api/articles/1")
       .send(requestBody)
       .expect(400)
       .then (({body: {msg}}) => {
         expect(msg).toBe("Bad Request")
       })
  });
  test('status 400: returns "Bad Request" message when passed request body without the required key', () => {
    const requestBody =  "5"; 
    return request(app)
       .patch("/api/articles/1")
       .send(requestBody)
       .expect(400)
       .then (({body: {msg}}) => {
         expect(msg).toBe("Bad Request")
       })
  });

  