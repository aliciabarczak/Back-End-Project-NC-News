const { fetchTopics, 
        fetchArticleById,
        updateVotesById, 
        fetchArticles, 
        fetchCommentsByArticleId, 
        postCommentToDB } = require("./../models/articles.models")
const { fetchUsers } = require("./../models/users.models")

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

exports.getCommentsByArticleId = (request, response, next) => {
    const { article_id } = request.params; 
    const promises = [fetchArticleById(article_id), fetchCommentsByArticleId(article_id)]
    
    Promise.all(promises).then(([_, comments]) => {
        response.status(200).send({comments})
    }).catch(next)
};

exports.postComment = (request, response, next) => {
    const { article_id } = request.params;
    const { username, body } = request.body; 
    const promises = [fetchArticleById(article_id)]; 

    if (typeof username !== "string" || typeof body !== "string") {
        response.status(400).send({msg: "Bad Request"})
        }
    else {
        promises.push(postCommentToDB(article_id, username, body))
    }
    Promise.all(promises).then(([_, createdComment]) => {
     response.status(201).send({ createdComment })})
     .catch(next)
 };


    
    