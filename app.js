const express = require("express");
//REQUIRE IN ALL CONTROLLER FUNCS
const { getTopics,
        getArticleById, 
        patchVotesById } = require("./controllers/news.controllers")

const app = express();

app.use(express.json());

app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticleById);

app.patch("/api/articles/:article_id", patchVotesById);

app.use('/*', (request, response, next) => {
    response.status(404).send({msg : 'Not Found'})
});

app.use((error, request, response, next) => {
    if (error.status && error.msg) {
      response.status(error.status).send({ msg: error.msg });
    } else next(error);
  });

app.use((error, request, response, next) => {
    if (error.code === '22P02') {
      response.status(400).send({ msg: 'Bad Request' });
    } else next(error);
});

app.use((error, request, response, next) => {
    console.log(error);
    response.status(500).send({ msg: "Internal Server Error" })
  });

  module.exports = app;