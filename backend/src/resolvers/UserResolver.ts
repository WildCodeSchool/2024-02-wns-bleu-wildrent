import { Mutation, Arg } from "type-graphql";
import argon2 from "argon2";
import { User } from "../entities/user";
import jwt from "jsonwebtoken";

class UserResolver {
  @Mutation(() => String)
  async createUser(
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    console.log("process", process.env);

    const hashedPassword = await argon2.hash(password);

    const userFromDB = await User.save({
      email: email,
      hashedPassword: hashedPassword,
    });

    console.log("user has just been saved", userFromDB);

    if (process.env.JWT_SECRET_KEY === undefined) {
      throw new Error("NO JWT SECRET KEY DEFINED");
    }
    const token = jwt.sign(
      { id: userFromDB.id, email: userFromDB.email, role: userFromDB.role },
      process.env.JWT_SECRET_KEY
    );

    return token;
  }
}

export default UserResolver;
