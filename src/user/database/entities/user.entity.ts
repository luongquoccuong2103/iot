import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  civilId: string;

  @Column()
  name: string;

  @Column()
  hometown: string;

  @Column()
  lastUpdated: string;
}
