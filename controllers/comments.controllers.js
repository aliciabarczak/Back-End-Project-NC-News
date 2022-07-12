const {
  deleteCommentbyIdFromDB,
  getCommentById,
} = require("./../models/comments.models");

exports.deleteCommentbyId = (request, response, next) => {
  const { comment_id } = request.params;

  const promises = [
    getCommentById(comment_id),
    deleteCommentbyIdFromDB(comment_id),
  ];

  Promise.all(promises)
    .then(() => {
      response.status(204).send({});
    })
    .catch(next);
};
