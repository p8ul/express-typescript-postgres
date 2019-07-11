import * as express from 'express';
import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
import { ApolloServer } from 'apollo-server-express';
import * as http from 'http';
import { Routes } from './routes';
import { baseMiddleware } from './middleware';
import resolvers from './graphql/combinedResolver';
import typeDefs from './graphql/combinedTypes';
import * as models from './models';
import { getUser } from './utils/auth';

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

dotenv.config();
class App {
    public app: express.Application;
    public route: Routes = new Routes();
    public server = new ApolloServer({
        typeDefs,
        resolvers,
        context: async ({ req }) => {     
            return {
              authScope: await getUser(req.headers.authorization),
              models,
            };
          },
    })

    constructor() {
        this.app = express();
        this.config();
        this.route.routes(this.app);
        this.server.applyMiddleware({ app: this.app});

        const httpServer = http.createServer(this.app);
        server.installSubscriptionHandlers(httpServer);

        httpServer.listen(4004, () => {
            console.log(`🚀 Server ready at http://localhost:${4004}${server.graphqlPath}`);
            console.log(`🚀 Subscriptions ready at ws://localhost:${4004}${server.subscriptionsPath}`);
        })
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