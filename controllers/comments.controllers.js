const { deleteCommentbyIdFromDB } = require("./../models/comments.models")

exports.deleteCommentbyId = (request, response, next) => {
   const { comment_id } = request.params;

   deleteCommentbyIdFromDB(comment_id).then(() => {
        response.status(204).send({})
    }).catch(next)
};