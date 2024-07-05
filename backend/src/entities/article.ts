import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Product } from "./product";

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
  @ManyToOne(() => Product)
  @JoinColumn({ name: "product_id" })
  product: Product;
}
