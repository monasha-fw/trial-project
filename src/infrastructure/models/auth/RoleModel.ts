import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class RoleModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;
}
