import { PropertyController } from '../controllers/property';

export class PropertyRoutes {
    public propertyController: PropertyController = new PropertyController();

    public routes(app): void {
        app.route('/property')
        .get(this.propertyController.listProperties)
        .post(this.propertyController.addProperty);
    }
}