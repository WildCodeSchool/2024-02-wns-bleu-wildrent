import { Article } from "../entities/article";
import {
  Arg,
  Authorized,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
  ID
} from "type-graphql";
import { Product } from "../entities/product";
import { Role } from "../entities/user";

@InputType()
class NewArticleInput {
  @Field()
  availability: boolean;

  @Field(() => ID)
  productId: string;
}

@Resolver(Article)
class ArticleResolver {
  @Query(() => [Article])
  async getAllArticles() {
    const article = await Article.find({
      relations: { product: true, reservations: true },
      order: { product: { name: "ASC" } },
    });
    return article;
  }

  @Authorized(Role.Admin)
  @Mutation(() => Article)
  async createNewArticle(@Arg("data") newArticleData: NewArticleInput) {
    const product = await Product.findOne({
      where: { id: newArticleData.productId },
    });
    if (!product) {
      throw new Error("Product not found");
    }

    const newArticle = Article.create({
      product: product,
    });

    await newArticle.save();
    return newArticle;
  }

  @Authorized(Role.Admin)
  @Mutation(() => String)
  async deleteArticle(@Arg("id", () => ID) idToDelete: string) {
    await Article.delete(idToDelete);
    return `Product deleted successfully`;
  }

  @Mutation(() => Article)
  async deleteArticleFromReservation(@Arg("articleId", () => ID) articleId: string) {
    const article = await Article.findOne({
      where: { id: articleId },
      relations: { reservations: true },
    });

    if (!article) {
      throw new Error("Article not found");
    }

    if (!article.reservations) {
      throw new Error("Article is not part of any reservation");
    }

    article.reservations = [];

    await article.save();

    return article;
  }

  @Mutation(() => String)
  async canDeleteArticle(
    @Arg("articleId") articleId: string
  ): Promise<boolean> {
    const article = await Article.findOne({
      where: { id: Number.parseInt(articleId) },
      relations: { reservations: true },
    });

    if (!article) {
      throw new Error("Article not found");
    }

    if (article.reservations && article.reservations.length > 0) {
      throw new Error("Article is part of a reservation and cannot be deleted");
    }

    return true;
  }
}

export default ArticleResolver;
