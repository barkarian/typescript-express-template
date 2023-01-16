import loginController from "@controllers/loginController";
import { relationalDataSource, nonRelationalDataSource } from "@config/dataSources";
import bodyParser from "body-parser";
import express from "express";
import { errorLogger, errorResponder, invalidPathHandler } from "@/middlewares/errorHandler";
import { dummyInsert } from "@/utis/dummyDatabaseInserts";

const app = express();

const startServer = async () => {
  console.log("Setting up the initialization of Data Source Module...");
  await relationalDataSource.initialize();
  await dummyInsert();
  //setup Json Parser to parse json from body
  const jsonParser = bodyParser.json();
  const urlencodedParser = bodyParser.urlencoded({ extended: false });
  //Setup all controllers (routes)
  app.use("/api", jsonParser, loginController);
  //Middlewares
  app.use(errorLogger);
  app.use(errorResponder);
  app.use(invalidPathHandler);

  app.listen(3000, async () => {
    console.log("server is running on port 3000");
  });
};

//EXPLANATION FOR startServer function:
//Node doesn't support top level await, therefore await must be inside async functions
startServer();