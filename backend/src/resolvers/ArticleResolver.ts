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

@InputType()
class EditArticleInput {
  @Field()
  availability: boolean;
}

// data from range picket
@InputType()
class DateRangeInput {
  @Field(() => Date)
  startDate: Date

  @Field(() => Date)
  endDate: Date
}


@Resolver(Article)
class ArticleResolver {
  @Query(() => [Article])
  async getAllArticles() {
    const article = await Article.find({ relations: { product: true, reservations: true } });
    return article
  }

  @Query(() => [Article])
  async getAvailableArticles(@Arg("dateRange") dateRange: DateRangeInput) {
    const { startDate, endDate } = dateRange
    const articles = await Article.find({ relations: { reservations: true } })

    // Filter articles based on their reservation dates
  const availableArticles = articles.filter(article => {
    return article.reservations.every(reservation => {
      const reservationStart = new Date(reservation.startDate)
      const reservationEnd = new Date(reservation.endDate)

      return (
        reservationEnd < startDate || // Reservation ends before the start date I searched
        reservationStart > endDate    // Reservation starts after the end date I searched 
    });
  });

    return availableArticles;
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
      availability: newArticleData.availability,
      product: product,
    });

    await newArticle.save();
    return newArticle;
  }

  @Authorized(Role.Admin)
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

  @Authorized(Role.Admin)
  @Mutation(() => String)
  async deleteArticle(@Arg("id") idToDelete: string) {
    await Article.delete(idToDelete);
    return `Product deleted successfully`;
  }
}

export default ArticleResolver;
