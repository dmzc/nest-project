import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import * as crypto from 'crypto';

function md5(str) {
  const hash = crypto.createHash('md5');
  hash.update(str);
  return hash.digest('hex');
}

@Injectable()
export class UserService {
  @InjectRepository(User)
  private userRepository: Repository<User>;

  private logger = new Logger();

  async register(user: UserDto) {
    const userRepository = this.userRepository;
    const foundUser = await userRepository.findOneBy({
      username: user.username,
    });

    if (foundUser != null) {
      throw new HttpException('用户已存在', 200);
    }
    const nUser = new User();
    nUser.username = user.username;
    nUser.password = md5(user.password);

    try {
      await userRepository.save(nUser);
      return '注册成功';
    } catch (e) {
      this.logger.error(e, UserService);
    }
  }

  async login(user: UserDto) {
    const foundUser = await this.userRepository.findOneBy({
      username: user.username,
    });
    if (!foundUser) {
      throw new HttpException('用户名不存在', 200);
    }
    if (foundUser.password !== md5(user.password)) {
      throw new HttpException('密码错误', 200);
    }
    return foundUser;
  }
}
