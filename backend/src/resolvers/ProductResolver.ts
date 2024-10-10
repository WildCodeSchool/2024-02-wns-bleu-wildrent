import { Like } from "typeorm";
import { Article } from "../entities/article";
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
    const products = await Product.find({ relations: ['articles'] });
    return products;
  }

  @Mutation(() => Product)
  async createNewProduct(@Arg("data") newProductData: NewProductInput) {
    const resultFromSave = await Product.save({
      ...newProductData,
    })

    return resultFromSave;
  }

  @Query(() => Product)
  async getOneProductById(@Arg("productId") productId: string) {
    const product = await Product.findOne({
      where: { id: Number.parseInt(productId), },
      relations: ['articles']
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
  
  @Mutation(() => Product)
  async editProduct(@Arg("productId")productId: string,  @Arg("data") newProductData: NewProductInput) {
    const product = await Product.findOneByOrFail({
      id: Number.parseInt(productId),
    })

    product.name = newProductData.name
    product.description = newProductData.description
    product.price = newProductData.price
    if (newProductData.imgUrl !== undefined) {
      product.imgUrl = newProductData.imgUrl
    }

    const updatedProduct = await product.save()
    return updatedProduct
  }

  // un produit est supprimé avec les articles qui lui sont associés
  @Mutation(() => String)
  async deleteProduct(@Arg("id") idToDelete: string) {
    const articlesToDelete = await Article.find({where: { product: { id: Number(idToDelete)}}})
    articlesToDelete.map(article => Article.delete(article.id))
    await Product.delete(idToDelete)
    return `Product deleted successfully`
  }
}

export default ProductResolver;
