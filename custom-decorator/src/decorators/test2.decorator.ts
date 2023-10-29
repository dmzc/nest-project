import { Test1Guard } from 'src/guards/test.guard';
import { Test1 } from './test1.decorator';
import { Get, UseGuards, applyDecorators } from '@nestjs/common';

export function Test2(path, role) {
  return applyDecorators(Get(path), Test1(role), UseGuards(Test1Guard));
}
