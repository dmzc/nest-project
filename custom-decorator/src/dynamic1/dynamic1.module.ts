import { DynamicModule, Module } from '@nestjs/common';
import { Dynamic1Controller } from './dynamic1.controller';

@Module({})
export class Dynamic1Module {
  static register(options: Record<string, any>): DynamicModule {
    return {
      module: Dynamic1Module,
      controllers: [Dynamic1Controller],
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
      ],
    };
  }
}
