import { Response, Request } from "express";
import { UserBody } from '../interfaces/userInterfaces';
import { userSchemma } from "../schemmas/userSchemmas";
import * as userService from '../services/userService';

async function create(req: Request, res: Response): Promise<Response<any,Record<string,any>>>{
    const userBody : UserBody = req.body;
    try {
        const { error } = userSchemma.validate(userBody);
        if(error) return res.status(400).send("Invalid Body")
        const result = await userService.create(userBody);
        if(!result) res.status(400).send("Invalid Body");
        res.status(201).send({
            token : result
        });
    } catch (error) {
        return res.status(500);
    }
}

export {
    create,
}