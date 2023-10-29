import { Module } from '@nestjs/common';
import { Dynamic2Controller } from './dynamic2.controller';
import { ConfigurableModuleClass } from './dynamic2.module.definition';

@Module({
  controllers: [Dynamic2Controller],
})
export class Dynamic2Module extends ConfigurableModuleClass {}
