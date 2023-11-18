import express, { Request, Response, json, urlencoded } from "express";
import morgan from "morgan";
import cors from "cors";
import GPTVAR from "gpt-var";

const gpt = new GPTVAR("test");
console.log(gpt);
const app: express.Application = express();
const port: number = 3000;

app.use(cors());

app.use(json());
app.use(urlencoded({ extended: true }));

app.use(morgan("dev"));

app.get("/", (request: Request, response: Response) => {
  response.send("Hello World");
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}! \n`);
});
