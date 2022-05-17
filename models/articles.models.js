const db = require("../db/connection");

exports.fetchTopics = () => {
    return db.query("SELECT * FROM topics").then(({rows}) => {
        return rows;
    })
};

exports.fetchArticleById = (article_id) => {
 return Promise.all([
    db.query("SELECT * FROM articles WHERE article_id = $1", [article_id]),
    db.query("SELECT * FROM comments WHERE article_id = $1", [article_id])
    ])
    .then(([article, allComments]) => {
        article = article.rows[0];
        if(!article) {
            return Promise.reject({status: 404, msg: "Not Found"})
        }
        const comment_count = allComments.rows.length;
        return {
            ...article,
            comment_count,
        };
    })
};
   
exports.updateVotesById = (article_id, inc_votes) => {
    return db.query(`SELECT votes 
                     FROM articles 
                     WHERE article_id = $1`, [article_id])
    .then(({rows}) => {
       if(!rows.length) {
            return Promise.reject({status: 404, msg: "Not Found"})
       }
       if (typeof inc_votes !== "number") {
           return Promise.reject({ status: 400, msg: "Bad Request"})
        }
       let votes = rows[0].votes; 
       votes += inc_votes;
            return db.query(`UPDATE articles SET votes = ${votes}
              WHERE article_id = $1
              RETURNING*`, [article_id])
    }).then(({rows}) => {
        return rows[0];
    })
};