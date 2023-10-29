import { Controller, Get, Inject } from '@nestjs/common';

@Controller('dynamic1')
export class Dynamic1Controller {
  @Inject('CONFIG_OPTIONS')
  private configOptions: Record<string, any>;

  @Get()
  dynamic1() {
    console.log(this.configOptions);
    return 'hello';
  }
}
