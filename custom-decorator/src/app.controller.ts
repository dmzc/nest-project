import { Controller, Get, SetMetadata, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Test1Guard } from './guards/test.guard';
import { Test1 } from './decorators/test1.decorator';
import { Test2 } from './decorators/test2.decorator';
import { Test3 } from './decorators/test3.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('test')
  @SetMetadata('test', 'admin')
  @UseGuards(Test1Guard)
  test1(): string {
    return this.appService.getHello();
  }

  /**
   * 直接用SetMetaData也可达到目的，Test1只是包上一层
   * @returns
   */
  @Get('test1')
  @Test1('admin1')
  @UseGuards(Test1Guard)
  test2(): string {
    return this.appService.getHello();
  }

  /**
   * 使用applyDecorators将多个装饰器组合在一起。
   * @returns
   */
  @Test2('test2', 'admin2')
  test3(): string {
    return this.appService.getHello();
  }

  /**
   * 参数装饰器
   * @param c
   * @returns
   */
  @Get('test3')
  test(@Test3() c): string {
    return c;
  }
}
