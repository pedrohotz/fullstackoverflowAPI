import { UserBody } from "../interfaces/userInterfaces";
import {v4 as uuid} from 'uuid';
import * as userRepository from "../repositories/userRepository";
async function create(userBody: UserBody) : Promise <string>{
    const {
        name,
        classname
    } = userBody;
    const classID = await userRepository.getClassId(classname);
    if(!classID) return null;
    const user = await userRepository.checkForExistentUser(name,classID);
    if(user) return null;
    const token: string = uuid();
    const result = await userRepository.insertUser({
        name,
        classID,
        token
    });
    return result;

}



export {
    create,
}