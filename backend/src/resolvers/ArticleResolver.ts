import { Article } from "../entities/article";
import {
  Arg,
  Authorized,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Product } from "../entities/product";
import { Role } from "../entities/user";

@InputType()
class NewArticleInput {
  @Field()
  availability: boolean;

  @Field(() => String)
  productId: number;
}
<<<<<<< HEAD
=======

<<<<<<< HEAD
@InputType()
class EditArticleInput {
  @Field()
  availability: boolean;
}

>>>>>>> a8da192 (56/delete-article: delete article + reservation if no remaining article)
=======
>>>>>>> 2d5d748 (fix article entity and type bugs)
@Resolver(Article)
class ArticleResolver {
  @Query(() => [Article])
  async getAllArticles() {
    const article = await Article.find({ relations: { product: true, reservations: true } })
    return article
  }

  @Authorized(Role.Admin)
  @Mutation(() => Article)
  async createNewArticle(@Arg("data") newArticleData: NewArticleInput) {
    const product = await Product.findOne({
      where: { id: Number(newArticleData.productId) },
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

<<<<<<< HEAD
<<<<<<< HEAD
  @Authorized(Role.Admin)
=======
  @Mutation(() => Article)
  async editArticle(
    @Arg("article") articleId: string,
    @Arg("data") newArticleData: EditArticleInput
  ) {
    const article = await Article.findOneByOrFail({
      id: Number.parseInt(articleId),
    });

    article.availability = newArticleData.availability;
    const updatedArticle = await article.save();
    return updatedArticle;
  }

>>>>>>> a8da192 (56/delete-article: delete article + reservation if no remaining article)
=======
  @Authorized(Role.Admin)

>>>>>>> 2d5d748 (fix article entity and type bugs)
  @Mutation(() => String)
  async deleteArticle(@Arg("id") idToDelete: string) {
    await Article.delete(idToDelete);
    return `Product deleted successfully`;
  }
<<<<<<< HEAD
=======

  @Mutation(() => Article)
  async deleteArticleFromReservation(@Arg("articleId") articleId: string) {
    const article = await Article.findOne({
      where: { id: Number.parseInt(articleId) },
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
>>>>>>> a8da192 (56/delete-article: delete article + reservation if no remaining article)
}

export default ArticleResolver;
