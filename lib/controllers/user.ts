import * as db from '../models/index.js';
import { Request, Response } from 'express';
import { generateToken } from '../utils/auth';
import * as bcrypt from 'bcryptjs';
import { postMessage } from '../slack/integration';

export class UserController {
    public addNewUser (req: Request, res: Response) {
        let newUser = new db.User(req.body);        

        newUser.save().then(async (data) => {
            // alert slack channect that a user account was created.
            const req = await postMessage(`${newUser.email} account created successfully`);
            return res.status(201).json({token: generateToken(data)});
        })
        .catch((error) => {
            res.json(error);
        });
    }

    public  async getUsers (req: Request, res: Response) {
        const users = await db.User.findAll();
        res.status(200).json(users);
    }

    public async getUserWithId (req: Request, res: Response) {
        const user = await db.User.findByPk(req.params.userId);
        if (!user) res.status(404).json({message: "User not found"});
        return res.status(200).json(user);
    }

    public async emailLogin (req: Request, res: Response) {  
        const user = await db.User.findOne({where: { email: req.body.email }});
        const message = 'Email or Password do not match';
        if (!user) return res.status(401).json({message});
        const isValid = await bcrypt.compareSync(req.body.password.toString(), user.password)
        if (!isValid) return res.status(401).json({message});
        return res.status(200).json({token: generateToken(user)});

    }

    public async updateUser (req: Request, res: Response) {
        const updated = await db.User.update({username: req.body.username}, {where: {id: req.params.userId}})
        if (updated[0] !== 1) return res.status(404).json({message: "User details not updated"})
        return res.status(200).json({message: "User details updated successfully"})
    }

    public async deleteUser (req: Request, res: Response) {
        const deleted = await db.User.destroy({where: {id: req.params.userId }});
        if (deleted === 0) res.status(404).json({message: "User not deleted!"});
        return res.json({message: "User deleted successfully"});
    }
}

