import { Like } from "typeorm";
import { Product } from "../entities/product";
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";

@InputType()
class NewProductInput implements Partial<Product> {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => String, { nullable: true })
  imgUrl?: string | undefined;

  @Field()
  price: number;
}

@Resolver(Product)
class ProductResolver {
  @Query(() => [Product])
  async getAllProducts() {
    const products = await Product.find();
    return products;
  }

  @Mutation(() => Product)
  async createNewProduct(@Arg("data") newProductData: NewProductInput) {
    const resultFromSave = await Product.save({
      ...newProductData,
    });

    return resultFromSave;
  }

  @Query(() => Product)
  async getOneProductById(@Arg("productId") productId: string) {
    const product = await Product.findOneByOrFail({
      id: Number.parseInt(productId),
    });
    return product;
  }

  @Query(() => [Product])
  async searchProducts(@Arg("keyword") keyword: string) {
    const products = await Product.find({
      where: [{ name: Like(`%${keyword}%`) }],
    });
    return products;
  }
}

export default ProductResolver;
