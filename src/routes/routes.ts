import {Request,Response,Express} from "express";
import {userController} from "../controller";
import validateResource from "../middleware/validateResource";
import {createUserSchema} from "../schema/user.schema";

const routes = (app: Express) => {
    app.get("/api/v1/healthCheck",(req:Request,res:Response)=>{
        res.sendStatus(200);
    })

    app.post("/api/v1/users",validateResource(createUserSchema),userController.createUserController)
}
export default routes;

