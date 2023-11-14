import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'test_user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    comment: '用户名',
    length: 50,
  })
  username: string;

  @Column({
    comment: '密码',
    length: 50,
  })
  password: string;

  @CreateDateColumn({
    comment: '创建时间',
  })
  createTime: Date;

  @UpdateDateColumn({
    comment: '更新时间',
  })
  updateTime: Date;
}
