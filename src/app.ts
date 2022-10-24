import express from 'express';
import config from 'config';
import logger from "./utils/logger";
import {messages} from "./constants";
import connection from "./utils/connection";
import routes from "./routes/routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const port = config.get<number>("PORT");

app.listen(port,async ()=>{
    logger.info(messages.SERVER_STARTED);
    await connection();
    routes(app);
});