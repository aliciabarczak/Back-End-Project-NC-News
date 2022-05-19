const express = require("express");
const { getTopics,
        getArticleById, 
        patchVotesById, 
        getArticles,
        getCommentsByArticleId,
        postComment } = require("./controllers/articles.controllers")
const { getAllUsers } = require("./controllers/users.controllers");
const { handleInvalidPathErrors,
        handleCustomErrors,
        handlePSQLErrors,
        handleInternalServerErrors } = require("./controllers/errors.controllers")
const { deleteCommentbyId } = require("./controllers/comments.controllers")

const app = express();

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleById);
app.patch("/api/articles/:article_id", patchVotesById);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id/comments", getCommentsByArticleId);
app.get("/api/users", getAllUsers);
app.post("/api/articles/:article_id/comments", postComment);
app.get("/api/articles?sort_by=title", getArticles);
app.get("/api/articles?sort_by=topic", getArticles);
app.get("/api/articles?sort_by=author", getArticles);
app.get("/api/articles?sort_by=created_at", getArticles);
app.get("/api/articles?order=asc", getArticles);
app.get("/api/articles?order=desc", getArticles);
app.get("/api/articles?topic=mitch", getArticles);
app.delete("/api/comments/:comment_id", deleteCommentbyId);

app.use(handleInvalidPathErrors);
app.use(handleCustomErrors);
app.use(handlePSQLErrors);
app.use(handleInternalServerErrors)

  module.exports = app;