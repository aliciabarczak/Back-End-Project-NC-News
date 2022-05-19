const db = require("../db/connection");

exports.fetchTopics = () => {
    return db.query("SELECT * FROM topics").then(({rows}) => {
        return rows;
    })
 };
exports.fetchTopicBySlug = (topic) => {
    return db.query("SELECT * FROM topics WHERE slug = $1", [topic]).then(({rows}) => {
        if(!rows.length) {
            return Promise.reject({status: 404, msg: "Not Found"})
        }
        return rows
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
exports.fetchArticles = (sort_by = "created_at", order = "desc", topic) => {
    const validSortBy = ["title", "topic", "author", "created_at", "votes", "comment_count"];
    const validOrder = ["asc", "desc", "ASC", "DESC"];
    const queryValues = []; 

    let queryArray = ["SELECT articles.*,",
                      " COUNT(comment_id) AS comment_count",
                      " FROM articles", 
                      " LEFT JOIN comments", 
                      " ON articles.article_id = comments.article_id",
                      " GROUP BY articles.article_id"]

    if (topic) {
        queryArray.splice(5, 0, ' WHERE topic = $1')
        queryValues.push(topic)
    }

    if(validSortBy.includes(sort_by)) {
        queryArray.push(` ORDER BY articles.${sort_by}`)
    } else {
        return Promise.reject({status: 400, msg: 'Invalid Sort Query'});
    }

    if(validOrder.includes(order)) {
        queryArray.push(` ${order}`);
    } else {
        return Promise.reject({status: 400, msg: 'Invalid Order Query'});
    }
    const queryStr = queryArray.join("");

    return db.query(queryStr, queryValues)
    .then(({rows}) => {
        rows.forEach((row) => {
            delete row.body
        })
        return rows 
    })
 };

exports.fetchCommentsByArticleId = (article_id) => {
    return db.query(`SELECT * FROM comments WHERE article_id = $1;`, [article_id])
    .then(({rows}) => {  
        return rows
    })
 };
exports.postCommentToDB = (article_id, username, body) => {
    return db.query(`INSERT INTO 
                    comments (body, author, article_id) 
                    VALUES ($1, $2, $3) 
                    RETURNING *;`, [body, username, article_id])
    .then(({rows}) => {
        return rows[0]
    })
 };
