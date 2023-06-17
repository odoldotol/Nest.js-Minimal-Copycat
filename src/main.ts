import { AppModule } from "./app/app.module";
import { NestFactory } from "src/nestjs_copycat/core";

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  // app.get("/", (req, res) => {
  //   res.send("Hello World!");
  // });
  // app.post("/greeting", (req, res) => {
  //   if (req.body.name?.trim().length > 0) {
  //     res.send(`Hello ${req.body.name}!`);
  //   } else {
  //     res.status(400).send("Bad Request");
  //   }
  // });
  app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
  });
};

bootstrap();