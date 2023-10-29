import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Dynamic1Module } from './dynamic1/dynamic1.module';
import { Dynamic2Module } from './dynamic2/dynamic2.module';

@Module({
  imports: [
    Dynamic1Module.register({ aaa: 111, bbb: 222 }),
    Dynamic2Module.register({ aaa: 111, bbb: '222' }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
