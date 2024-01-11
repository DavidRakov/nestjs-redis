import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(2000);
  console.log('listening on http://localhost:2000');
  console.log('GraphQL listening on http://localhost:2000/graphql');
}
bootstrap();
