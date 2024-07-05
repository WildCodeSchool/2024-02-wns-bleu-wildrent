import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Length } from "class-validator";
import { Field, ObjectType } from "type-graphql";

@ObjectType() //typeGraphQl
@Entity() //typeORM
export class Product extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  @Length(10, 100)
  name: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column({
    default:
      "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg",
  })
  imgUrl: string;

  @Field()
  @Column()
  price: number;
}
