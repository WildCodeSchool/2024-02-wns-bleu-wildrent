import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { User } from "./user";

@ObjectType()
@Entity()
export class Reservation extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ default: "PENDING" })
  status: string;

  @Field()
  @Column({ type: "date" })
  date: string;

  @Field(() => User)
  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;
}
