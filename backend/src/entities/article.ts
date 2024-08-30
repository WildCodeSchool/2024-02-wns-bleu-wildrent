import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Product } from "./product";
import { Reservation } from "./reservation";

@ObjectType() //typeGraphQl
@Entity() //typeORM
export class Article extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  availability: boolean;

  @Field(() => Product)
  @ManyToOne(() => Product, (product) => product.articles)
  product: Product;

  @Field(() => Reservation)
  @ManyToOne(() => Reservation, (reservation) => reservation.articles)
  reservation: Reservation;
}
