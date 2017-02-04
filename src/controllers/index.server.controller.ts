import * as express from "express";
const low = require('lowdb')

const uuid = require('uuid/v1');

const db = low('db.json');
db.defaults({ routes: [{id:0,url:'/api/', func:"(req)=>{return req.path;}"}] })
    .value();

export default class IndexController {
    public static api(req: express.Request, res: express.Response, next: Function): void {
        const result = db.get('routes')
            .filter({url:req.path})
            .value()
        if(result.length==0)
            return res.render("index", {title:'No api entry'});
        res.json(eval(result[0].func)(req,{db:db}));
    }

    //Admin routes
    public static getRoute(req: express.Request, res: express.Response, next: Function): void{
        const routes = db.get('routes')
            .value();
        res.json({data:routes});
    }

    public static getSingleRoute(req: express.Request, res: express.Response, next: Function): void{
        const route = db.get('routes')
            .filter(({id:parseInt(req.param('id'))}))
            .value();
        res.json({data:route});
    }

    public static addRoute(req: express.Request, res: express.Response, next: Function): void{
        const routes = db.get('routes')
            .push({id:uuid(), url:req.body.url, func:req.body.func})
            .value();
        res.json({data:routes});
    }
    
    public static updateRoute(req: express.Request, res:express.Response, next: Function):void{
        db.get('routes')
            .find({id: req.param('id')})
            .assign({url:req.body.url, func:req.body.func})
            .value();
        const routes = db.get('routes')
            .value();
        res.json({data:routes});
    }

    public static deleteRoute(req: express.Request, res:express.Response, next: Function):void{
        db.get('routes')
            .remove({id: req.param('id')})
            .value();
        const routes = db.get('routes')
            .value();
        res.json({data:routes});
    }
}