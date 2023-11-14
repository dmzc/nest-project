import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { UploadModule } from './upload/upload.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { createClient } from 'redis';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import  config from './config/config.js';

@Module({
  imports: [
    PersonModule,
    UploadModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'zcm199',
      database: 'test',
      synchronize: false,
      logging: true,
      entities: [User],
      migrations: [],
      subscribers: [],
      connectorPackage: 'mysql2',
      extra: {
        authPlugin: 'sha256_password',
      },
    }),
    JwtModule.register({
      global: true,
      secret: 'zhang123',
      signOptions: {
        expiresIn: '7d',
      },
    }),
    ConfigModule.forRoot({
      load: [config],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'app_service',
      useClass: AppService,
    },
    {
      provide: 'person',
      useValue: {
        name: 'aaa',
        age: 20,
      },
    },
    {
      provide: 'person1',
      useFactory() {
        return {
          name: 'aaa',
          desc: 'ccc',
        };
      },
    },
    {
      provide: 'person2',
      async useFactory() {
        await new Promise((resolve) => {
          setTimeout(resolve, 100);
        });
        return {
          name: 'bbb',
          desc: 'ccc',
        };
      },
    },
    {
      provide: 'person3',
      useFactory(person: { name: string }, appService: AppService) {
        return {
          name: person.name,
          desc: appService.getHello(),
        };
      },
      inject: ['person', AppService],
    },
    {
      provide: 'person4',
      useExisting: 'person2',
    },
    {
      provide: 'REDIS_CLIENT',
      async useFactory() {
        const client = createClient({
          socket: {
            host: 'localhost',
            port: 6379,
          },
        });
        await client.connect();
        return client;
      },
    },
  ],
})
export class AppModule {}
