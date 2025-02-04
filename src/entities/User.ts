import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column({unique: true})
  email!: string;

  @Column()
  firstname!: string;

  @Column()
  lastname!: string;

  @Column({ type: 'date' })
  birthdate!: string;

  @Column()
  timezone!: string;

  @Column()
  status!: number;
}
