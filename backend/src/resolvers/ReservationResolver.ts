// import { Like } from "typeorm";
// import { User } from "../entities/user";
// import { Reservation } from "../entities/reservation";
// import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";

// @InputType()
// class NewReservationInput implements Partial<Reservation> {
//   @Field()
//   id: number;

//   @Field()
//   status: string;

//   @Field()
//   date: string 

// }

// @Resolver(Reservation)
// class ReservationResolver {
//   @Query(() => [Reservation])
//   async getAllProducts() {
//     const reservations = await Reservation.find({ relations: ["users"] });
//     return reservations;
//   }

//   @Mutation(() => Reservation)
//   async createNewReservation(
//     @Arg("data") newReservationData: NewReservationInput
//   ) {
//     const resultFromSave = await Reservation.save({
//       ...newReservationData,
//     });

//     return resultFromSave;
//   }

//   @Query(() => Reservation)
//   async getOneProductById(@Arg("reservationId") reservationId: string) {
//     const reservation = await Reservation.findOneByOrFail({
//       id: Number.parseInt(reservationId),
//     });
//     return reservation;
//   }

//   @Query(() => [Reservation])
//   async searchProducts(@Arg("keyword") keyword: String) {
//     const reservations = await Reservation.find({
//       where: [{ status: Like(`%${keyword}%`) }],
//     });
//     return reservations;
//   }

//   @Mutation(() => Reservation)
//   async editProduct(
//     @Arg("reservationId") reservationId: string,
//     @Arg("data") newReservationData: NewReservationInput
//   ) {
//     const reservation = await Reservation.findOneByOrFail({
//       id: Number.parseInt(reservationId),
//     });

//     reservation.id = newReservationData.id;
//     reservation.status = newReservationData.status;
//     reservation.date = newReservationData.date;

//     const updatedReservation = await reservation.save();
//     return updatedReservation;
//   }

//   //un produit est supprimé avec les articles qui lui sont associés
//   @Mutation(() => String)
//   async deleteUser(@Arg("id") idToDelete: Number) {
//     const usersToDelete = await User.find({
//       where: { reservation: {id: Number(idToDelete)} },
//     });
//     usersToDelete.map((user) => User.delete(user.id));
//     await Reservation.delete(idToDelete);
//     return `Reservation deleted successfully`;
//   }
// }

// export default ReservationResolver;




import { Reservation } from "../entities/reservation";
import { Arg, Field, InputType, Query, Resolver } from "type-graphql";

@InputType()
export class NewReservationInput {
  @Field()
  status: string;

  @Field()
  userId: number;

  @Field()
  date: Date;
}

@Resolver(Reservation)
export class ReservationResolver {
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
