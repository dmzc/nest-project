import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'test_user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    name: 'test_name',
    length: 50,
  })
  name: string;
}
