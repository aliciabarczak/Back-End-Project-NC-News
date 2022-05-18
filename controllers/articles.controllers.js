const { fetchTopics, 
        fetchArticleById,
        updateVotesById, 
        fetchArticles, 
        fetchCommentsByArticleId } = require("./../models/articles.models")

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

exports.patchVotesById = (request, response, next) => {
    const {article_id } = request.params; 
    const {inc_votes} = request.body;
    updateVotesById(article_id, inc_votes).then((updatedArticle) => {
        response.status(200).send({updatedArticle});
    }).catch((error)=> {
        console.log(error)
        next(error)
    });
};

exports.getArticles = (request, response, next) => {
    fetchArticles()
    .then((articles) => {
        response.status(200).send({articles})
    }).catch((error) => {
        console.log(error)
        next(error)
    })
};

exports.getCommentsByArticleId = (request, response) => {
    const { article_id } = request.params; 
    fetchCommentsByArticleId(article_id)
    .then((comments) => {
        response.status(200).send({ comments })
    }).catch((error) => {
        console.log(error)
    })
};