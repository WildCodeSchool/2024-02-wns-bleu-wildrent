import { Product } from "./../entities/product";
import { Arg, Query, Resolver } from "type-graphql";

@Resolver(Product)
class ProductResolver {
  @Query(() => [Product])
  async getAllProducts() {
    const products = await Product.find();
    return products;
  }

  @Query(() => Product)
  async getOneProductById(@Arg("productId") productId: string) {
    const product = await Product.findOneByOrFail({
      id: Number.parseInt(productId),
    });
    return product;
  }
}
export default ProductResolver;
