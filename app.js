const express = require("express");
const cors = require("cors");
const {
  getTopics,
  getArticleById,
  patchVotesById,
  getArticles,
  getCommentsByArticleId,
  postComment,
} = require("./controllers/articles.controllers");
const { getAllUsers } = require("./controllers/users.controllers");
const {
  handleInvalidPathErrors,
  handleCustomErrors,
  handlePSQLErrors,
  handleInternalServerErrors,
} = require("./controllers/errors.controllers");
const { deleteCommentbyId } = require("./controllers/comments.controllers");
const { getEndpoints } = require("./controllers/endpoints.controllers");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api", getEndpoints);

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleById);
app.patch("/api/articles/:article_id", patchVotesById);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id/comments", getCommentsByArticleId);
app.get("/api/users", getAllUsers);
app.post("/api/articles/:article_id/comments", postComment);
app.delete("/api/comments/:comment_id", deleteCommentbyId);

app.use(handleInvalidPathErrors);
app.use(handleCustomErrors);
app.use(handlePSQLErrors);
app.use(handleInternalServerErrors);

module.exports = app;
