const db = require("../db/connection");

exports.deleteCommentbyIdFromDB = (comment_id) => {
    return db.query("DELETE FROM comments WHERE comment_id = $1", [comment_id])
}