import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { blue, magenta } from 'chalk';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(2000);
  console.log(blue('listening on http://localhost:2000'));
  console.log(magenta('GraphQL listening on http://localhost:2000/graphql'));
}
bootstrap();
