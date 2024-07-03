import { Product } from "../entities/product";
import {
  Query,
  Resolver,
} from "type-graphql";

@Resolver(Product)
class ProductResolver {
  @Query(() => [Product])
  async getAllProducts() {
    const products = await Product.find();
    return products;
  } 
}

export default ProductResolver;