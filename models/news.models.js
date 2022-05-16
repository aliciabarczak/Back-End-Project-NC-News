const db = require("../db/connection");


exports.fetchTopics = () => {
    return db.query("SELECT * FROM topics").then(({rows}) => {
        return rows;
    })
};

exports.fetchArticleById = (article_id) => {
    return db.query("SELECT * FROM articles WHERE article_id = $1", [article_id])
    .then(({rows}) => {
        if(!rows.length) {
            return Promise.reject({status: 404, msg: "Not Found"})
        }
        return rows[0];
    })
};

exports.updateVotesById = (article_id, inc_votes) => {
    return db.query(`SELECT votes 
                     FROM articles 
                     WHERE article_id = $1`, [article_id])
    .then(({rows}) => {
       let votes = rows[0].votes; 
       votes += inc_votes;
    return db.query(`UPDATE articles
              SET votes = ${votes}
              WHERE article_id = $1
              RETURNING*`, [article_id])
    }).then(({rows}) => {
        return rows[0];
    })
}