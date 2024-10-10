import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType, registerEnumType } from "type-graphql";
import { Reservation } from "./reservation";

export enum Role {
  User = "user",
  Admin = "admin",
}

// this is used to export the type to the frontend through GraphQL
registerEnumType(Role, {
  name: 'Role',  
  description: 'user role', 
})

@ObjectType() //typeGraphQl
@Entity() //typeORM
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

  @Field()
  @Column()
  hashedPassword: string;

  @Field(() => Role)
  @Column({ default: Role.User})
  role: Role;

  @Field(() => [Reservation],{ nullable: true })
  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations?: Reservation[];
}