import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column()
  position: string;

  @Column()
  image: string;

  @Column()
  likes: number;

  @Column()
  dislikes: number;
}
