import { Reservation } from "../entities/reservation";
import { User } from "../entities/user";
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";


@InputType()
class NewReservationInput {
  @Field()
  status: string;

  @Field()
  date: string;

  @Field(() => String, { nullable: true })
  userId: number;
}

@InputType()
class EditReservationInput {
  @Field()
  status: string;
}

@Resolver(Reservation)
class ReservationResolver {
  @Query(() => [Reservation])
  async getAllReservations() {
    const reservation = await Reservation.find({ relations: { user: true } });
    return reservation;
  }

  @Mutation(() => Reservation)
  async createNewReservation(
    @Arg("data") newReservationData: NewReservationInput
  ) {
    const user = await User.findOne({
      where: { id: Number(newReservationData.userId) },
    });
    if (!user) {
      throw new Error("User not found");
    }

    const newReservation = Reservation.create({
      status: newReservationData.status,
      user: user,
    });

    await newReservation.save();
    return newReservation;
  }

  @Mutation(() => Reservation)
  async editReservation(
    @Arg("reservation") reservationId: string,
    @Arg("data") newReservationData: EditReservationInput
  ) {
    const reservation = await Reservation.findOneByOrFail({
      id: Number.parseInt(reservationId),
    });

    reservation.status = newReservationData.status;
    const updatedReservation = await reservation.save();
    return updatedReservation;
  }

  @Mutation(() => String)
  async deleteReservation(@Arg("id") idToDelete: string) {
    await Reservation.delete(idToDelete);
    return `Reservation deleted successfully`;
  }
}

export default ReservationResolver;
