import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './logger.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './redis/redis.module';
import { cyan } from 'chalk';
import { UserEntity } from './users/entities/user.entity';

@Module({
  imports: [
    UsersModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      subscriptions: {
        'graphql-ws': true,
      },
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      autoSchemaFile: 'schema.gql',
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1/my_data', {
      connectionFactory: (connection) => {
        connection.on('connected', () => {
          console.log(cyan('mongodb connected successfully!!!'));
        });
        connection._events.connected();
        return connection;
      },
    }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   password: 'mnhm4954',
    //   username: 'postgres',
    //   entities: [UserEntity],
    //   database: 'postgres',
    //   synchronize: true,
    //   logging: true,
    // }),
    ConfigModule.forRoot({ isGlobal: true }),
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('');
  }
}
