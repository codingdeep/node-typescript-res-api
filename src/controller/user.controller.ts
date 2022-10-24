import {Request,Response,NextFunction} from "express";
import {userService} from "../service/user.service";
import logger from "../utils/logger";
import {createUserInput} from "../schema/user.schema";

export const userController = {
    createUserController
}
async function createUserController(req:Request<{},{},createUserInput["body"]>,res:Response,next:NextFunction){
    try{
        const user = await userService.createUserService(req.body);
        return res.status(200).send(user);
    }catch (e:any){
        logger.error(e);
        return res.status(409).send(e.message);
    }
}