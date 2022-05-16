const express = require("express");
//REQUIRE IN ALL CONTROLLER FUNCS
const { getTopics } = require("./controllers/news.controllers")

const app = express();

app.use(express.json());

app.get("/api/topics", getTopics)

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send({ msg: "internal server error" })
  });

  module.exports = app;