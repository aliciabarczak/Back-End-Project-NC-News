const db = require("./../db/connection.js");

exports.fetchUsers = () => {
    return db.query("SELECT * FROM users").then(({rows}) => {
        return rows.map((user) => {
            return {"username" : user.username};
        })
    })
}

exports.fetchUserByUsername = (username) => {
    return db.query("SELECT * FROM users WHERE username = $1", [username])
    .then(({rows}) => {
        if(!rows.length) {
            return Promise.reject({status: 404, msg: "Username Not Found"})
       }
            return rows[0]
        })
};
