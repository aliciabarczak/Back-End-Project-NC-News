//REQUIRE IN ALL MODEL FUNCS
const { fetchTopics, 
        fetchArticleById } = require("./../models/news.models")

exports.getTopics = (request, response, next) => {
    fetchTopics().then((topics) => {
        response.status(200).send({ topics }); 
    }).catch((error) => {
        console.log(error)
        next(error)
    });
};

exports.getArticleById = (request, response, next) => {
    const {article_id } = request.params; 
    fetchArticleById(article_id)
    .then((article) => {
        response.status(200).send({article});
    }).catch((error)=> {
        console.log(error)
        next(error)
    });
};