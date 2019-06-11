import { Request, Response } from 'express';
import { UserRoutes } from './user';
import { PropertyRoutes } from './property';

export class Routes {
    public userRoutes: UserRoutes = new UserRoutes();
    public propertyRoutes: PropertyRoutes = new PropertyRoutes();

    public routes(app): void {
        app.route('/')
        .get((req: Request, res: Response) => {
            res.status(200).send({
                message: "Welcome to the awesome api.. :)!!"
            });
        });
        this.userRoutes.routes(app);
        this.propertyRoutes.routes(app);
        
    }
}