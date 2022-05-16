const express = require("express");
//REQUIRE IN ALL CONTROLLER FUNCS
const { getTopics,
        getArticleById } = require("./controllers/news.controllers")

const app = express();

app.use(express.json());

app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticleById);

app.use('/*', (req, res, next) => {
    res.status(404).send({msg : 'Not Found'});
})

app.use((error, request, response, next) => {
    console.log(err);
    response.status(500).send({ msg: "Internal Server Error" })
  });

  module.exports = app;