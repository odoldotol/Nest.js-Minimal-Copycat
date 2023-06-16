import { AppModule } from "./app/app.module";
import { NestFactory } from "./nestjs_copycat/core";

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  await app.listen();
};

bootstrap();