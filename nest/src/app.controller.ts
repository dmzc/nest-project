import {
  Controller,
  Get,
  Inject,
  Res,
  Session,
  Headers,
  UnauthorizedException,
  HttpStatus,
} from '@nestjs/common';
import { AppService } from './app.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

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

  @ApiOperation({ summary: '测试接口1', description: 'aaa描述' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'aaa 成功',
    type: String,
  })
  @Get()
  async getHello(
    @Headers() headers,
    @Session() session,
    @Res({ passthrough: true }) response: Response,
  ) {
    const newToken = this.jwtService.sign({ count: 1 });
    response.setHeader('token', newToken);
    session.count = session.count ? session.count + 1 : 1;
    console.log(this.configService.get('aaa'));
    console.log(headers);
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
