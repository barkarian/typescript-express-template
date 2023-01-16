import express, { Request, Response, NextFunction } from "express";
import { errorLogger, errorResponder, invalidPathHandler } from "@/middlewares/errorHandler";
import AppError from "@/middlewares/errors/AppError";

const app = express();
const port: number = 3000;

app.get("/", (request: Request, response: Response) => {
  response.send("response for GET request");
});

app.get("/productswitherror", (
  request: Request,
  response: Response) => {

  let error: AppError = new AppError(400,
    `processing error in request at ${request.url}`);

  error.statusCode = 400;
  throw error;
});


// Attach the first Error handling Middleware
// function defined above (which logs the error)
app.use(errorLogger);

// Attach the second Error handling Middleware
// function defined above (which sends back the response)
app.use(errorResponder);

// Attach the fallback Middleware
// function which sends back the response for invalid paths)
app.use(invalidPathHandler);


app.listen(port, () => {
    console.log(`Server listening at port ${port}.`);
  }
);