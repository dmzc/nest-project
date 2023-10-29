import { SetMetadata } from '@nestjs/common';

export const Test1 = (...args: string[]) => SetMetadata('test', args);
