import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // constructor(
  //   @Inject(AppService)
  //   private readonly appService: AppService,
  //   @Inject('app_service')
  //   private readonly appService1: AppService,
  //   @Inject('person')
  //   private readonly person: any,
  //   @Inject('person1')
  //   private readonly person1: any,
  //   @Inject('person2')
  //   private readonly person2: any,
  //   @Inject('person3')
  //   private readonly person3: any,
  //   @Inject('person4')
  //   private readonly person4: any,
  // ) {}
  @Inject('app_service')
  private readonly appService1: AppService;
  @Inject('person')
  private readonly person: any;
  @Inject('person1')
  private readonly person1: any;
  @Inject('person2')
  private readonly person2: any;
  @Inject('person3')
  private readonly person3: any;
  @Inject('person4')
  private readonly person4: any;
  @Inject(AppService)
  private readonly appService: AppService;

  @Get()
  async getHello() {
    return this.appService.getHello();
  }
}
