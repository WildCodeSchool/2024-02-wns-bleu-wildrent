import { Context } from "src";
import { Reservation } from "../entities/reservation";
import { Arg, Ctx, Field, ObjectType, Query, Resolver } from "type-graphql";
import { calculateTotal } from "../utils/reservation/calculateTotal";

// custom object created to send the totalPrice along with the reservation data
@ObjectType()
export class ReservationWithTotal {
    @Field(() => Reservation)
    reservation: Reservation;

    @Field(() => Number)
    totalPrice: number;
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

}
export default ReservationResolver;



