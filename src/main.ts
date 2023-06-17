import { NestFactory } from "src/nestjs-copycat/core";
import { AppModule } from "./app/app.module";

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
  });
};

bootstrap();