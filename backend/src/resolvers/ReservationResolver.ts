import { Context } from "src";
import { Reservation, ReservationStatus } from "../entities/reservation";
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { calculateTotal } from "../utils/reservation/calculateTotal";
import { Article } from "../entities/article";

// custom object created to send the totalPrice along with the reservation data
@ObjectType()
export class ReservationWithTotal {
    @Field(() => Reservation)
    reservation: Reservation;

    @Field(() => Number)
    totalPrice: number;
}

@InputType()
class NewReservationInput {
  @Field()
  startDate: Date;

  @Field()
  endDate: Date;

  @Field(() => String)
  articleId: number
}

@Resolver(Reservation)
class ReservationResolver {
    @Query(() => [Reservation])
    async getAllReservations() {
        const reservations = await Reservation.find({ relations: ['user', 'articles', 'articles.product'] });
        return reservations;
    }

    @Query(() => Reservation)
    async getOneReservationById(@Arg("reservationId") reservationId: string) {
        const reservation = await Reservation.findOne({ where: {id: Number.parseInt(reservationId)}, relations: ['user', 'articles', 'articles.product'] })
        return reservation;
    }

    @Query(() => ReservationWithTotal)
    async getCurrentReservationByUserId(@Ctx() context: Context) {
        if (context.id !== undefined) {
        const reservation = await Reservation.findOne({ where: {user: {id: context.id}}, order: {createdAt: 'DESC'}, relations: ['user', 'articles', 'articles.product'] })
        if (reservation) 
            {const totalPrice = calculateTotal(reservation.articles)
        return {reservation, totalPrice}}
        else {
            return null
        } ; 
    }
        else {
            return []
        }
    }

    @Query(() => [Reservation])
    async getReservationsByUserId(@Ctx() context: Context) {
        if (context.id !== undefined) {
        const reservations = await Reservation.find({ where: {user: {id: context.id}}, relations: ['user', 'articles', 'articles.product'] })
        return reservations;    
    } else {
        return []
    }
    }

    @Mutation(() => Reservation)
    async createNewReservation(@Ctx() context: Context, @Arg("data") newReservationData: NewReservationInput) {
    if (!context.id) {
        throw new Error("User not authenticated");
    }
    // si le user a déjà une réservation pending, ne pas en créer une nouvelle
    const existingPendingReservation = await Reservation.findOne({
        where: {
          user: { id: context.id },
          status: ReservationStatus.Pending,
        },
      });   
      if (existingPendingReservation) {
        throw new Error("You already have a pending reservation.");
      }

    // ajouter un premier article pour initialiser la réservation 
    const article = await Article.findOne({
        where: { id: Number(newReservationData.articleId)},
        });
        if (!article) {
        throw new Error("Article not found")
    }

      const newReservation = Reservation.create({
        startDate: newReservationData.startDate,
        endDate: newReservationData.endDate,
        articles: [article],
        user: {id: context.id},
        status: ReservationStatus.Pending
      });
  
      await newReservation.save();
      return newReservation;
    }

    @Mutation(() => Reservation)
    async addArticleToReservation(@Arg("reservation")reservationId: string,  @Arg("articleId") articleId: string) {
        const reservation = await Reservation.findOne({
            where: { id: Number.parseInt(reservationId) }, 
            relations: ["articles"]
          })

        if (!reservation) {
        throw new Error("Reservation not found");
        }

        const articleToAdd = await Article.findOne({
            where: { id: Number(articleId)},
            });
            if (!articleToAdd) {
            throw new Error("Article not found")
        }

        reservation.articles = [...reservation.articles, articleToAdd]
        const updatedReservation = await reservation.save()
        return updatedReservation
    }

}
export default ReservationResolver;




