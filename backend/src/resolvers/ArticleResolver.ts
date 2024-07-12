import { Article } from "../entities/article";
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Product } from "../entities/product";

@InputType()
class NewArticleInput {
  @Field()
  availability: boolean;

  @Field(() => String, { nullable: true })
  productId: number
}

@InputType()
class EditArticleInput {
  @Field()
  availability: boolean;
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

  @Mutation(() => Article)
  async editArticle(@Arg("article")articleId: string,  @Arg("data") newArticleData: EditArticleInput) {
    const article = await Article.findOneByOrFail({
      id: Number.parseInt(articleId),
    })

    article.availability = newArticleData.availability
    const updatedArticle = await article.save()
    return updatedArticle
  }

  @Mutation(() => String)
  async deleteArticle(@Arg("id") idToDelete: string) {
    await Article.delete(idToDelete)
    return `Product deleted successfully`
  }

}

export default ArticleResolver;
