import { Request, Response, NextFunction } from 'express';
import * as userRepository from "../repositories/userRepository";

export default async function authorization(req: Request, res: Response, next: NextFunction) {
    try {
        const { authorization } = req.headers;
        const token = authorization?.replace('Bearer ', '');
        if(!token){
            return res.sendStatus(401);
        }
        const userId = await userRepository.getUserByToken(token);
        if(!userId) return res.sendStatus(401);
        res.locals.userId = userId;
        next();

    } catch (error) {
        return res.sendStatus(500);
    }
}