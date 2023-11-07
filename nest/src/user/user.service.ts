import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  @InjectEntityManager()
  private entityManager: EntityManager;

  create(createUserDto: CreateUserDto) {
    this.entityManager.save(User, createUserDto);
  }

  findAll() {
    return this.entityManager.find(User);
  }

  findOne(id: number) {
    return this.entityManager.findOne(User, { where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.entityManager.save(User, {
      id: id,
      ...updateUserDto,
    });
  }

  remove(id: number) {
    this.entityManager.delete(User, id);
  }
}
