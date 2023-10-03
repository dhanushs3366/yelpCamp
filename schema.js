const Joi=require("joi")

module.exports.campgroundSchema=Joi.object({
    title: Joi.string().required(),
    price: Joi.number().required().min(0),
    location: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required()  // Add this line for the 'image' field
}).required();

module.exports.ratingSchema=Joi.object({
    review:Joi.object({
        rating:Joi.number().required(),
        body:Joi.string().required()
    }).required
}).required()