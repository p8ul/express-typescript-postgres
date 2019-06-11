import { Request, Response } from 'express';
import * as db from '../models';
import { postMessage } from '../slack/integration';

export class PropertyController {
    public async addProperty (req: Request, res: Response) {
        let newProperty = await new db.Property(req.body);

        newProperty.save()
        .then(async (property) => {
            postMessage(`${property.name} created successfully.`)
            return res.status(201).json(property)
        })
        .catch((error) => {
            return res.json(error);
        })
    }

    public async listProperties (req: Request, res: Response) {
        const properties = await db.Property.findAll({attributes: ['id', 'name', 'createdAt'],include: [{model: db.User, as: 'user', where: {}, attributes: ['id', 'username', 'email']}]});
        res.status(200).json(properties);
    }
}