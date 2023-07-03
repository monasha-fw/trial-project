import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import RoleModel from './RoleModel';

@Entity()
export default class UserModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password?: string;

  @ManyToMany(() => RoleModel)
  @JoinTable()
  roles!: RoleModel[];

  // status: ;
}
