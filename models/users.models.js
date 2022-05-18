const db = require("./../db/connection.js");

exports.fetchUsers = () => {
    return db.query("SELECT * FROM users").then(({rows}) => {
        return rows.map((user) => {
            return {"username" : user.username};
        })
    })
}

exports.addUser = (username) => {
    return db.query(`INSERT INTO 
                     users (username, name)
                     VALUES ($1, $1)
                     RETURNING *`, [username])
    .then(({rows}) => {
        return rows[0]
    })
};