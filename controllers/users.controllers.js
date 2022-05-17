const {fetchUsers } = require("./../models/users.models");

exports.getAllUsers = (request, response) => {
    fetchUsers()
    .then((usernames) => {
        console.log(usernames)
       response.status(200).send({usernames})
    }).catch((error) => {
       console.log(error)
    })
};