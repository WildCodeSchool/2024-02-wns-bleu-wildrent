import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";

@ObjectType() //typeGraphQl
@Entity() //typeORM
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  hashedPassword: string;

  @Column({ default: "USER" })
  role: string;
}
