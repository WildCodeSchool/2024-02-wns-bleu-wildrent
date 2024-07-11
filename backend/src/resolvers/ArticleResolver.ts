import { Article } from "../entities/article";
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Product } from "../entities/product";

@InputType()
class NewArticleInput {
  @Field()
  availability: boolean;

  @Field()
  productId: number
}

@Resolver(Article)
class ArticleResolver {
  @Query(() => [Article])
  async getAllArticles() {
    const article = await Article.find({ relations: { product: true } });
    return article;
  }

  @Mutation(() => Article)
  async createNewArticle(@Arg("data") newArticleData: NewArticleInput) {
    const product = await Product.findOne({
      where: { id: Number(newArticleData.productId)},
    });
    if (!product) {
      throw new Error("Product not found");
    }

    const newArticle = Article.create({
      availability: newArticleData.availability,
      product: product,
    });

    await newArticle.save();
    return newArticle;
  }
}

export default ArticleResolver;
