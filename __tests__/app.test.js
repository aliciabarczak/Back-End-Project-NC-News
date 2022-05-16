process.env.NODE_ENV = "test";
const request = require('supertest');
const app = require('../app');
const db = require('../db/connection');
const seed = require("./../db/seeds/seed");
const testData = require("./../db/data/test-data");

afterAll(() => {
    if (db.end) db.end();
  });
  
  beforeEach(() => {
    return seed(testData);
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