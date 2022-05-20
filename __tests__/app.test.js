const request = require('supertest');
const app = require('../app');
const db = require('../db/connection');
const seed = require("./../db/seeds/seed");
const testData = require("./../db/data/test-data");


beforeEach(() => {
    return seed(testData);
  });

afterAll(() => {
    db.end();
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
          expect(article).toEqual(expect.objectContaining({
              author: "butter_bridge",
              title: "Living in the shadow of a great man",
              article_id: 1,
              body: "I find this existence challenging",
              topic: "mitch",
              created_at: "2020-07-09T20:11:00.000Z",
              votes: 100,
          }))
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

describe("6. GET /api/users", () => {
  test('status 200: responds with an array of objects with username properties only', () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({body: {usernames}}) => {
              expect(usernames).toHaveLength(4)
              usernames.forEach((user) => {
                  expect.objectContaining({
                      username: expect.any(String),
                  })
              })
          })
      });
      test("404: responds with route not found when passed invalid GET ALL route", () => {
        return request(app)
        .get("/api/bananas")
        .expect(404)
        .then(({body: {msg}}) => {
          expect(msg).toBe("Not Found")
        })
    })
  });
  })
describe("7. GET /api/articles/:article_id (comment count)",   () => {
  test('status 200: returns the article response object which new comment_count property', () => {
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
        comment_count: 11,
      })
    })
  });
  });
describe("8. GET /api/articles", () => {
  test('Status 200: responds with an array of objects contaning all articles. Each article object should include additional "votes" and "comment_count" property', () => {
  return request(app)
  .get("/api/articles")
  .expect(200)
  .then(({body: {articles}}) => {
      expect(articles).toHaveLength(12)
      articles.forEach((article) => {
        expect.objectContaining({
          author: expect.any(String),
          title: expect.any(String),
          article_id: expect.any(Number),
          topic: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number),
          comment_count: expect.any(Number),
      })
    expect(articles).toBeSortedBy("created_at", { descending: true })
    })
  })
  })
  test('Status 404: returns "Not Found" error message when passed invalid path', () => {
  request(app)
  .get("/api/sloth")
  .expect(404)
  .then(({body: { msg }}) => {
      expect(msg).toBe("Not Found")
    })
  });
  });

describe("9. GET /api/articles/:article_id/comments", () => {
    test.only("status 200: returns an array of comments for the given article_id", () => {
      return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({body: { comments }}) => {
        console.log(comments)
          expect(comments).toHaveLength(11);
          comments.forEach((comment) => {
              expect.objectContaining({
                  comment_id: expect.any(String),
                  votes: expect.any(Number),
                  created_at: expect.any(String),
                  author: expect.any(String),
                  body: expect.any(String)
              });
          })
       })
    });

    test('status 400: responds with "Bad Request" when passed an id of invalid type', () => {
    return request(app)
    .get("/api/articles/sloth/comments")
    .expect(400)
    .then (({body: {msg}}) => {
      expect(msg).toBe("Bad Request")
    })
  });
    test('status 404: responds with "Not Found" when passed an id that does not exist', () => {
    return request(app)
    .get("/api/articles/9999999/comments")
    .expect(404)
    .then(({body: {msg}}) => {
      expect(msg).toBe("Not Found")
    })
   }); 
    test('status 200: responds with an empty array when the given id exists but has no comments', () => {
    return request(app)
    .get("/api/articles/2/comments")
    .expect(200)
    .then(({body: { comments }}) => {
      expect(comments).toEqual([])
    })
   }); 
  });

  describe.only("10. POST /api/articles/:article_id/comments",() => {
    test('status 201: should post requested comment from an exisiting user and return the same', () => {
        const postedComment = {
            username: "butter_bridge",
            body: "nope"
        };
        return request(app)
        .post("/api/articles/2/comments")
        .send(postedComment)
        .expect(201)
        .then(({ body: { createdComment } }) => {
          console.log(createdComment)
            expect(createdComment).toEqual(expect.objectContaining({
                article_id: 2,
                author: "butter_bridge",
                body: "nope",
                comment_id: 19,
                created_at: expect.any(String),
                votes: 0
            }))
        })
      });
      test('status 400: responds with "Bad Request" when passed an id of invalid type', () => {
        const postedComment = {
            username: "butter_bridge",
            body: "I am Banana"
        };
        return request(app)
        .post("/api/articles/sloth/comments")
        .send(postedComment)
        .expect(400)
        .then (({body: {msg}}) => {
          expect(msg).toBe("Bad Request")
        })
      });
      test('status 404: responds with "Not Found" when passed an id that does not exist', () => {
        const postedComment = {
          username: "butter_bridge",
            body: "I am Banana"
        };
        return request(app)
        .post("/api/articles/9999999/comments")
        .send(postedComment)
        .expect(404)
        .then(({body: {msg}}) => {
          expect(msg).toBe("Not Found")
        })
       }); 

      test("code 400: returns 'Bad Request' error message when passed request body with missing keys", () => {
        const postedComment = {
            body: "I am Banana"
        };
        return request(app)
        .post("/api/articles/1/comments")
        .send(postedComment)
        .expect(400)
        .then(({ body: { msg } }) => {
            expect(msg).toBe("Bad Request")
        })
      });
      test("code 400: returns 'Bad Request' error message when passed request body with invalid value types", () => {
        const postedComment = {
            username: false,
            body: "none"
          };
        return request(app)
        .post("/api/articles/1/comments")
        .send(postedComment)
        .expect(400)
        .then(({ body: { msg } }) => {
            expect(msg).toBe("Bad Request")
        })
      });
      test("code 400: returns 'Bad Request' error message when passed request body with invalid username", () => {
        const postedComment = {
            username: "banana",
            body: "none"
          };
        return request(app)
        .post("/api/articles/1/comments")
        .send(postedComment)
        .expect(400)
        .then(({ body: { msg } }) => {
            expect(msg).toBe("Bad Request")
        })
      });
  });
  
describe("11. GET /api/articles (queries)", () => {
  test('status 200: returns the articles sorted by the passed query in descending order by default', () => {
      return request(app)
      .get("/api/articles?sort_by=title")
      .expect(200)
      .then(({body: {articles}}) => {
          expect(articles).toBeSortedBy("title", { descending: true })
      })
    })
  test('status 400: returns error message when passed invalid sorted by value', () => {
    return request(app)
    .get("/api/articles?sort_by=bestArticle")
    .expect(400)
    .then(({body: {msg}}) => {
        expect(msg).toBe("Invalid Sort Query")
    })
    })
  test('status 200: articles are sorted by date by default in descending order by default', () => {
    return request(app)
    .get("/api/articles")
    .expect(200)
    .then(({body: {articles}}) => {
        expect(articles).toBeSortedBy("created_at", { descending: true })
    })
    })
  test('status 200: articles can be sorted by decedning order', () => {
    return request(app)
    .get("/api/articles?order=desc")
    .expect(200)
    .then(({body: {articles}}) => {
      expect(articles).toBeSortedBy("created_at", { descending: true })
      })
    })
  test('status 200: articles can be sorted by ascending order', () => {
    return request(app)
    .get("/api/articles?order=asc")
    .expect(200)
    .then(({body: {articles}}) => {
      expect(articles).toBeSortedBy("created_at")
      })
    })
  test('status 400: returns error message when passed invalid order value', () => {
    return request(app)
    .get("/api/articles?order=banana")
    .expect(400)
    .then(({body: {msg}}) => {
      expect(msg).toBe("Invalid Order Query")
      })
    })
  test('status 200: filters the articles by the topic value specified in the query', () => {
    return request(app)
    .get("/api/articles?topic=mitch")
    .expect(200)
    .then(({body: {articles}}) => {
        expect(articles).toHaveLength(11)
        articles.forEach((article) => {
          expect(article.topic).toBe("mitch")
        })
      })
      })
    test('status 404: return error message when query topic does not exist', () => {
      return request(app)
      .get("/api/articles?topic=carrot")
      .expect(404)
      .then(({body: {msg}}) => {
          expect(msg).toBe("Not Found")
        })
        })
      test('status 200: return an empty array when query topic exists but has no associated articles', () => {
        return request(app)
        .get("/api/articles?topic=paper")
        .expect(200)
        .then(({body: { articles }}) => {
          expect(articles).toEqual([])
          })
        })
  });

  describe("12. DELETE /api/comments/:comment_id", () => {
    test("status 204: deletes a given comment by comment_id and responds with an empty response body", () => {
        return request(app)
        .delete("/api/comments/4")
        .expect(204)
        .then(({body}) => {
            expect(body).toEqual({});
        })
    })
    test('status 404: responds with "Not Found" when passed an id that does not exist', () => {
      return request(app)
      .delete("/api/comments/999999")
      .expect(404)
      .then(({body: {msg}}) => {
        expect(msg).toBe("Not Found")
      })
     }); 
     test('status 400: responds with "Bad Request" when passed an id of invalid type ', () => {
       return request(app)
       .delete("/api/comments/sloth")
       .expect(400)
       .then(({body: {msg}}) => {
         expect(msg).toBe("Bad Request")
       })
     });
});
