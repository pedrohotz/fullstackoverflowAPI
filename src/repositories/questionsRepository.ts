import connection from "../connection/database";
import { QuestionBodyDB } from "../interfaces/questionsIntefaces";


async function getUserByName(student: string): Promise <number>{
    const result = await connection.query("SELECT id FROM users WHERE name = $1",[student])
    if(!result){
        return null;
    }
    return result.rows[0].id;
}



async function insertQuestion(questionBody: QuestionBodyDB) : Promise <number>{
    const {
        question,
        userId,
        tags,
    } = questionBody;
    const result = await connection.query("INSERT INTO questions (question,student,tags) VALUES ($1,$2,$3) RETURNING id", [question,userId,tags]);
    return result.rows[0].id;
}



export {
    insertQuestion,
    getUserByName,
}