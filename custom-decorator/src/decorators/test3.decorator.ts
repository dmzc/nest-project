import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const Test3 = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    console.log(data, ctx);
    return 'test3';
  },
);
