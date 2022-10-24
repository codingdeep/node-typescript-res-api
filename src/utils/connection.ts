import mongoose from "mongoose";
import config from "config";
import logger from "./logger";
import {messages} from "../constants";
const connection = async () =>{
   try{
       const dbURL = config.get<string>("dbURL");
       await mongoose.connect(dbURL);
       logger.info(messages.DATABASE_CONNECTION_ESTABLISHED);
   }catch (e:any){
       logger.info(messages.DATABASE_CONNECTION_FAILURE);
       process.exit(1);
   }
};
export default connection;