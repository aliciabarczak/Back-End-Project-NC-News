const express = require("express");
const { getTopics,
        getArticleById, 
        patchVotesById, 
        getArticles,
        getCommentsByArticleId } = require("./controllers/articles.controllers")
const { getAllUsers } = require("./controllers/users.controllers");
const { handleInvalidPathErrors,
        handleCustomErrors,
        handlePSQLErrors,
        handleInternalServerErrors } = require("./controllers/errors.controllers")

const app = express();

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleById);
app.patch("/api/articles/:article_id", patchVotesById);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.get("/api/users", getAllUsers);

app.use(handleInvalidPathErrors);
app.use(handleCustomErrors);
app.use(handlePSQLErrors);
app.use(handleInternalServerErrors)

  module.exports = app;