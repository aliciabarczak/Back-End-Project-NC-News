const avaliableEndpoints = require("./../endpoints.json");

exports.getEndpoints = (request, response) => {
  response.status(200).send({ avaliableEndpoints });
};
