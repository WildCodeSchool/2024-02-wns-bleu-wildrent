import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Field, ObjectType, registerEnumType } from "type-graphql";
import { User } from "./user";

export enum Status {
  pending = "pending",
  validated = "validated",
}

registerEnumType(Status, {
  name: "Status",
  description: "The status of a reservation",
});

@ObjectType()
@Entity()
export class Reservation extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Status)
  @Column({
    type: "enum",
    enum: Status,
  })
  status: Status;

  @Field()
  @Column({ type: "date" })
  date: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user)
  @JoinColumn({ name: "user_id" })
  user: User;
}
