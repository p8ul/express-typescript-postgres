import { Request, Response } from 'express';
export const baseMiddleware = (req: Request, res: Response, next) => {
    console.log("I'm a middleware.....");
    next();
}