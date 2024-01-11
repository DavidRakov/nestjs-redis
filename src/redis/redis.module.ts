import { Global, Module } from '@nestjs/common';
import { gray } from 'chalk';
import * as Redis from 'redis';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: async () => {
        const client = Redis.createClient();
        await client.connect();
        console.log(gray('connect to redis'));
        return client;
      },
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
