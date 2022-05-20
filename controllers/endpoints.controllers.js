
const { fetchEndpoints } = require("./../models/endpoints.models");

exports.getEndpoints = (request, response) => {
    fetchEndpoints().then((avaliableEndpoints) => {
        console.log(avaliableEndpoints)
        response.status(200).send({avaliableEndpoints})
    }).catch((error) => {
        console.log(error)
    })
}