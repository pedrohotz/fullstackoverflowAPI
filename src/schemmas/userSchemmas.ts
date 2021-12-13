import joi from "joi";


const userSchemma = joi.object({
    name: joi.string().min(3).required(),
    classname: joi.string().max(2).required(),
})


export {
    userSchemma,
}