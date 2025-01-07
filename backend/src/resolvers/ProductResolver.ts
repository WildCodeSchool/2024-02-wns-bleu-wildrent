import { Like } from "typeorm";
import { Article } from "../entities/article";
import { Product } from "../entities/product";
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
import { Role } from "../entities/user";


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

// data from range picker
@InputType()
class ProductDateRangeInput {
  @Field(() => Date,{ nullable: true })
  startDate: Date

  @Field(() => Date ,{ nullable: true })
  endDate: Date
}

@Resolver(Product)
class ProductResolver {
  @Query(() => [Product])
  async getAllProducts() {
    const products = await Product.find({
      relations: {
        articles: {
          reservations: true,
        },
      },
    });    
    return products;
  }


  @Authorized(Role.Admin)
  @Mutation(() => Product)
  async createNewProduct(@Arg("data") newProductData: NewProductInput) {
    const resultFromSave = await Product.save({
      ...newProductData,
    });

    return resultFromSave;
  }

  @Query(() => Product)
  async getOneProductById(@Arg("productId", () => ID) productId: string) {
    const product = await Product.findOne({
      where: { id: productId },
      relations: ["articles"],
    });
    return product;
  }

  @Query(() => [Product])
  async searchAndFilterProducts(
    @Arg("keyword", { nullable: true }) keyword?: string,
    @Arg("dateRangeInput", { nullable: true }) dateRangeInput?: ProductDateRangeInput
  ) {
  let products: Product[]


  if (keyword) {
    products = await Product.find({
      where: [{ name: Like(`%${keyword}%`) }],
      relations: {
        articles: {
          reservations: true,
        },
      },
    })
  } else {
    products = await Product.find({
      relations: {
        articles: {
          reservations: true,
        },
      },
    })
  }

  if (!dateRangeInput) {
    return products
  }
    const availableProducts = products.filter(product => {
      // si un produit n'a pas d'article associé il n'est pas dispo pas dispo
      if (!product.articles || product.articles.length === 0) {
        return false
      }
  
      // si un produit a au moins un article dispo, on l'affiche
      return product.articles.some(article => {
        // si un article n'a pas de réservation associée, il est dispo
        if (!article.reservations || article.reservations.length === 0) {
          return true
        }
  
         // je regarde les réservations pour chaque article. 
      // la fonction renvoie false si, pour au moins une réservation : 
        return article.reservations.every(reservation => {
          return (
            reservation.endDate < dateRangeInput.startDate ||  // la date de début que j'ai choisie tombe avant la fin de la réservation
            reservation.startDate > dateRangeInput.endDate   // la date de fin que j'ai choisie tombe après le début de la réservation 
          )
        })
      })
    })
  
    return availableProducts
  }
  
  
  @Authorized(Role.Admin)
  @Mutation(() => Product)
  async editProduct(
    @Arg("productId", () => ID) productId: string,
    @Arg("data") newProductData: NewProductInput
  ) {
    const product = await Product.findOneByOrFail({
      id: productId,
    });

    product.name = newProductData.name;
    product.description = newProductData.description;
    product.price = newProductData.price;
    if (newProductData.imgUrl !== undefined) {
      product.imgUrl = newProductData.imgUrl;
    }

    const updatedProduct = await product.save();
    return updatedProduct;
  }

  // un produit est supprimé avec les articles qui lui sont associés
  @Authorized(Role.Admin)
  @Mutation(() => String)
  async deleteProduct(@Arg("id", () => ID) idToDelete: string) {
    const articlesToDelete = await Article.find({
      where: { product: { id: idToDelete} },
    });
    articlesToDelete.forEach((article) => Article.delete(article.id));
    await Product.delete(idToDelete);
    return `Product deleted successfully`;
  }
}

export default ProductResolver;
