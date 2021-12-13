import '../setup';
import connection from "../connection/database";
import { UserBodyDB } from "../interfaces/userInterfaces";


async function getClassId(classname:string) : Promise <number> {
    const result = await connection.query('SELECT id FROM class WHERE classname = $1',[classname]);
    if(!result.rowCount) return null;
    return result.rows[0].id;
}




async function checkForExistentUser(name:string, classid:number) : Promise <boolean> {
    const result = await connection.query('SELECT * FROM users WHERE name = $1 AND class_id = $2',[name,classid]);
    if(result.rowCount > 0) return true;
    return null
}



async function insertUser(userBody:UserBodyDB) : Promise<string> {
    const {
        name,
        classID,
        token
    } = userBody;
    const result = await connection.query('INSERT INTO users (name,token,class_id) VALUES ($1,$2,$3) RETURNING token',[name,token,classID]);
    return result.rows[0].token;
}




export{
    getClassId,
    checkForExistentUser,
    insertUser
}