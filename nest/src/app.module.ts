import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';

@Module({
  imports: [PersonModule],
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
  ],
})
export class AppModule {}
