import {
  Controller,
  Get,
  Inject,
  Res,
  Session,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

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
  @Inject(JwtService)
  private jwtService: JwtService;

  @Inject(ConfigService)
  private configService: ConfigService;

  @Get()
  async getHello(
    @Session() session,
    @Res({ passthrough: true }) response: Response,
  ) {
    const newToken = this.jwtService.sign({ count: 1 });
    response.setHeader('token', newToken);
    session.count = session.count ? session.count + 1 : 1;
    console.log(this.configService.get("aaa"));
    return this.appService.getHello();
  }
  @Get('validate')
  validate(
    @Headers('auth') auth: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    if (auth) {
      try {
        const data = this.jwtService.verify(auth);
        const newToken = this.jwtService.sign({ count: data.count + 1 });
        response.setHeader('token', newToken);

        return data.count + 1;
      } catch (e) {
        console.log(e);
        throw new UnauthorizedException();
      }
    } else {
      const newToken = this.jwtService.sign({
        count: 1,
      });
      response.setHeader('token', newToken);
    }
  }
}
