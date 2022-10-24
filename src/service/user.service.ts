import UserModel, {UserDocument} from "../model/user.model";
import {DocumentDefinition} from "mongoose"
export const userService = {
    createUserService
}
async function createUserService(input:DocumentDefinition<Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword">>){
    try{
        const user = await UserModel.create(input);
        return user;
    }catch (e:any){
        throw new Error(e);
    }
}