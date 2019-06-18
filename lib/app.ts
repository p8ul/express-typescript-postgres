import * as express from 'express';
import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
import { Routes } from './routes';
import { baseMiddleware } from './middleware';
dotenv.config();
class App {
    public app: express.Application;
    public route: Routes = new Routes();

    constructor() {
        this.app = express();
        this.config();
        this.route.routes(this.app);
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());

        // support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));

        // Register middleware
        this.app.use(baseMiddleware);
    }
}

export default new App().app;