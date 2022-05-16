//REQUIRE IN ALL MODEL FUNCS
const { fetchTopics } = require("./../models/news.models")

exports.getTopics = (request, response) => {
    fetchTopics().then((topics) => {
        response.status(200).send({ topics }); 
    }).catch((error) => {
        console.log(error)
    });
}