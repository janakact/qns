import * as express from "express";
import IndexController from "../controllers/index.server.controller";

export default class IndexRoute {
	constructor(app : express.Express) {
		IndexRoute.activate(app);
	}
	
	public static activate (app : express.Express) : void {
		app.route("/api/*")
			.all(IndexController.api);
		app.route("/admin/route")
			.get(IndexController.getRoute);
		app.route("/admin/route")
			.post(IndexController.addRoute);
		app.route("/admin/route/:id")
			.get(IndexController.getSingleRoute);
		app.route("/admin/route/:id")
			.post(IndexController.updateRoute);
		app.route("/admin/route/delete/:id")
			.post(IndexController.deleteRoute);

	}
}