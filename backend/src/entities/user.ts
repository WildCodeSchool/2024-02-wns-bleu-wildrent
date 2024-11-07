import { Authorized, Field, ObjectType, registerEnumType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Reservation } from "./reservation";

export enum Role {
  Admin = "Admin",
  User = "User",
}

// this is used to export the type to the frontend through GraphQL
registerEnumType(Role, {
  name: "Role",
  description: "user role",
});

@ObjectType() // TypeGraphQL
@Entity() // TypeORM
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  firstname: string;

  @Field()
  @Column()
  lastname: string;

  // Only connected
  @Authorized()
  @Field()
  @Column()
  hashedPassword: string;

  // Only Admin
  @Authorized(Role.Admin)
  @Field(() => Role)
  @Column({ default: Role.User })
  role: Role;

  // Only connected
  @Authorized()
  @Field(() => [Reservation], { nullable: true })
  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations?: Reservation[];
}
