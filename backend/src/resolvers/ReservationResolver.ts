import { Context } from "src"
import { Reservation, ReservationStatus } from "../entities/reservation"
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql"
import { calculateTotal } from "../utils/reservation/calculateTotal"
import { Article } from "../entities/article"

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
    async handleReservation(
      @Ctx() context: Context,
      @Arg("data") reservationData: NewReservationInput
    ) {
      if (!context.id) {
        throw new Error("User not authenticated");
      }
  
      // Check if user already has a pending reservation
      let reservation = await Reservation.findOne({
        where: {
          user: { id: context.id },
          status: ReservationStatus.Pending,
        },
        relations: ["articles"],
      })
  
      // If no pending reservation exists, create a new reservation
      if (!reservation) {
        const article = await Article.findOne({
          where: { id: Number(reservationData.articleId) },
        });
        if (!article) {
          throw new Error("Article not found")
        }
  
        reservation = Reservation.create({
          startDate: reservationData.startDate,
          endDate: reservationData.endDate,
          articles: [article],
          user: { id: context.id },
          status: ReservationStatus.Pending,
        })
        await reservation.save();
      } else {
        // If a pending reservation exists, add the article to the reservation
        const articleToAdd = await Article.findOne({
          where: { id: Number(reservationData.articleId) },
        })
        if (!articleToAdd) {
          throw new Error("Article not found");
        }
  
        // Check if article was already in the reservation
        const isAlreadyInReservation = reservation.articles.some(
          (article) => article.id === articleToAdd.id
        )
        if (!isAlreadyInReservation) {
          reservation.articles.push(articleToAdd)
        }
  
        await reservation.save()
      }
      return reservation;
    }

  }

export default ReservationResolver;




