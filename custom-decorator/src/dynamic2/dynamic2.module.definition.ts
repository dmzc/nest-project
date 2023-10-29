import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface Dynamic2ModuleOptions {
  aaa: number;
  bbb: string;
}

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<Dynamic2ModuleOptions>().build();
