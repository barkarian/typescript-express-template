import simpleController from "@controllers/simpleController";
import {relationalDataSource, nonRelationalDataSource} from "@config/dataSources";
import bodyParser from "body-parser";
import express from "express";
import {errorLogger, errorResponder, invalidPathHandler} from "@/middlewares/errorHandler";
import {dummyInsert} from "@/utis/dummyDatabaseInserts";

const app = express();

//Node doesn't support top level await, therefore awaits must be inside async functions
//So I create this function,then I call it synchronously
const startServer = async () => {
    console.log("Setting up the initialization of Data Source Module...");
    //Initialize database dbname,password,entities etc (with typeORM)
    await relationalDataSource.initialize();
    //Insert dummy input and "console-logged" them
    await dummyInsert();

    //MIDDLEWARES
    //Parsing middlewares
    //Setup Json Parser to parse json from body
    const jsonParser = bodyParser.json();
    //Other type of parsing middlewares example(not in use at the app)
    const urlencodedParser = bodyParser.urlencoded({extended: false});
    //Parsing middlewares *execute before the controller*
    app.use("/api", jsonParser, simpleController);

    //Middlewares for Error Handling and logging
    //*Execute after the controller* -when controller routes execute next()
    app.use(errorLogger);
    app.use(errorResponder);
    app.use(invalidPathHandler);

    //Start the application
    app.listen(3000, async () => {
        console.log("Server is running on port 3000");
    });
};

startServer();