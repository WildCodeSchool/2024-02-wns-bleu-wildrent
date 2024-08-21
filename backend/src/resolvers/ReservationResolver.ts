import { Reservation, Status } from "../entities/reservation";
import { Arg, Field, InputType, Query, Resolver } from "type-graphql";

@InputType()
export class NewReservationInput {
  @Field(() => Status)
  status: Status;

  @Field()
  userId: number;

  @Field()
  date: Date;
}

@Resolver(Reservation)
class ReservationResolver {
  @Query(() => Reservation)
  async getOneReservationById(@Arg("reservationId") reservationId: string) {
    const reservation = await Reservation.findOneOrFail({
      where: { id: Number.parseInt(reservationId) },
      relations: ["user"],
    });
    return reservation;
  }
}

export default ReservationResolver;
