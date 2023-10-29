import { Controller, Get, Inject } from '@nestjs/common';
import {
  Dynamic2ModuleOptions,
  MODULE_OPTIONS_TOKEN,
} from './dynamic2.module.definition';

@Controller('dynamic2')
export class Dynamic2Controller {
  @Inject(MODULE_OPTIONS_TOKEN)
  private configOptions: Dynamic2ModuleOptions;

  @Get()
  dynamic2() {
    console.log(this.configOptions);
    return this.configOptions;
  }
}
