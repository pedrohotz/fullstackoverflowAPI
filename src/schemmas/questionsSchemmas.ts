import joi from 'joi';

const questionSchemma = joi.object({
    question: joi.string().min(5).required(),
    student: joi.string().min(3).required(),
    classname: joi.string().max(2).alphanum().required(),
    tags: joi.string().min(3).required(), 
})


export {
    questionSchemma,
}