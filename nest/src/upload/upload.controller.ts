import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  AnyFilesInterceptor,
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { storage } from './custom.storage';

@Controller('upload')
export class UploadController {
  /**
   * 单个字段上传单个文件
   * @param file
   * @param body
   */
  @Post('singleFile')
  @UseInterceptors(
    FileInterceptor('field1', {
      dest: 'uploads',
    }),
  )
  singleFile(@UploadedFile() file: Express.Multer.File, @Body() body) {
    console.log(file);
    console.log(body);
  }

  /**
   * 单个字段上传多个文件。
   * @param files
   * @param body
   */
  @Post('arrayFile')
  @UseInterceptors(
    FilesInterceptor('field1', 3, {
      dest: 'uploads',
    }),
  )
  arrayFile(@UploadedFile() files: Array<Express.Multer.File>, @Body() body) {
    console.log(files);
    console.log(body);
  }

  /**
   * 多个字段上传多个文件
   * @param files
   * @param body
   */
  @Post('multiFile')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'field1', maxCount: 2 },
        { name: 'field2', maxCount: 3 },
      ],
      {
        dest: 'uploads',
      },
    ),
  )
  multiFile(
    @UploadedFiles()
    fileObj: {
      field1?: Array<Express.Multer.File>;
      field2?: Array<Express.Multer.File>;
    },
    @Body() body,
  ) {
    console.log(fileObj);
    console.log(body);
  }

  @Post('anyFile')
  @UseInterceptors(
    AnyFilesInterceptor({
      dest: 'uploads',
    }),
  )
  anyFile(@UploadedFiles() files: Array<Express.Multer.File>, @Body() body) {
    console.log('body', body);
    console.log('files', files);
  }

  /**
   * 自定义存储方法
   * @param files 
   * @param body 
   */
  @Post('customStorage')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: storage,
    }),
  )
  customStorage(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body,
  ) {
    console.log('body', body);
    console.log('files', files);
  }
}
