const db = require("../db/connection");

exports.fetchTopics = () => {
    return db.query("SELECT * FROM topics").then(({rows}) => {
        return rows;
    })
};

exports.fetchArticleById = (article_id) => {
    return db.query(`
                    SELECT articles.*,
                        COUNT(comment_id) AS comment_count
                    FROM articles 
                    LEFT JOIN comments 
                    ON articles.article_id = comments.article_id
                    WHERE articles.article_id = $1
                    GROUP BY articles.article_id;`, [article_id])
       .then(({rows}) => {
        if(!rows.length) {
            return Promise.reject({status: 404, msg: "Not Found"})
       }
            rows[0].comment_count = parseInt(rows[0].comment_count)
            return rows[0]
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

exports.fetchArticles = () => {
    return db.query(
           `SELECT articles.*,
                COUNT(comment_id) AS comment_count
            FROM articles 
            LEFT JOIN comments 
            ON articles.article_id = comments.article_id
            GROUP BY articles.article_id
            ORDER BY articles.created_at DESC;`)
    .then(({rows}) => {
        rows.forEach((row) => {
            delete row.body
        })
        return rows 
    })
};

exports.fetchCommentsByArticleId = (article_id) => {
    return Promise.all([
       db.query(`SELECT *
                 FROM comments 
                 WHERE article_id = $1;`, [article_id]),
        db.query(`SELECT *
                  FROM articles 
                  WHERE article_id = $1;`, [article_id])
    ]).then(([comments, checkExists]) => {
        if (!comments.rows.length && !checkExists.rows.length) {
            return Promise.reject({status: 404, msg: "Not Found"})
        }
       return comments.rows
    })
};