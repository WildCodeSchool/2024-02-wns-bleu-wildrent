import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
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

  @ManyToOne(() => User, (user) => user.reservations, { eager: true })
  @JoinColumn()
  user: User;
}




  // @Field(() => [User], {})
  // @ManyToOne(() => User, (User) => User)
  // user?: User[];

  // @Field(() => User)
  // @ManyToOne(() => User, (user) => user)
  // @JoinColumn()
  // user: User;