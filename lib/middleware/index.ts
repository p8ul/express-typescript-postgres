import { Request, Response } from 'express';
export const baseMiddleware = (req: Request, res: Response, next) => {
    // Todo: add base middle functions
    next();
}