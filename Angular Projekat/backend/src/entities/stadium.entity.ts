import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Stadium {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  city: string;

  @Column()
  attendance: number;
}
