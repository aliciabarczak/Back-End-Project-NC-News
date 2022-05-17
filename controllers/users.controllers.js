const {fetchUsers } = require("./../models/users.models");

exports.getAllUsers = (request, response) => {
    fetchUsers().then((users) => {
        console.log(users)
        response.status(200).send({users})
    }).catch((error) => {
        console.log(error)
    })
};