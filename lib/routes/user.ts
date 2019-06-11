import { UserController } from '../controllers/user';

export class UserRoutes {
    public userController: UserController = new UserController();

    public routes(app): void {
        
        app.route('/user')
        // GET endpoint
        .get(this.userController.getUsers)

        // POST endpoint
        .post(this.userController.addNewUser);

        // user detail
        app.route('/user/:userId')
        // get specific user
        .get(this.userController.getUserWithId)
        .put(this.userController.updateUser)
        .delete(this.userController.deleteUser)

        // email login
        app.route('/login')
        .post(this.userController.emailLogin);
    }
}