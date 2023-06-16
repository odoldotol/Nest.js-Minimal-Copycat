const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  await app.listen();
};

bootstrap();