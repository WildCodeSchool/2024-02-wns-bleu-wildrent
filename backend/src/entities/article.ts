import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany
} from "typeorm";
import { Field, ObjectType, ID } from "type-graphql";
import { Product } from "./product";
import { Reservation } from "./reservation";

@ObjectType() //typeGraphQl
@Entity() //typeORM
export class Article extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string

  @Field(() => Product)
  @ManyToOne(() => Product, (product) => product.articles)
  product: Product

  @Field(() => [Reservation], { nullable: true }) // GraphQL
  @ManyToMany(() => Reservation, reservation => reservation.articles) //  TypeORM
  reservations?: Reservation[]
}
