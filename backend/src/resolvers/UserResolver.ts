import { Mutation, Arg, Query, Ctx, ObjectType, Field } from "type-graphql";
import argon2 from "argon2";
import { User } from "../entities/user";
import jwt from "jsonwebtoken";
import { Context } from "src";

@ObjectType()
class UserInfo {
  @Field()
  isLoggedIn: boolean;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  firstname: string;

  @Field({ nullable: true })
  lastname: string;

  @Field({ nullable: true })
  role: string;
}

class UserResolver {
  @Query(() => String)
  async logout(@Ctx() context: any) {
    context.res.setHeader("Set-Cookie", `token=;Max-Age=0`);
    return "Logged out";
  }

  @Query(() => String)
  async login(
    @Arg("email") emailFromClient: string,
    @Arg("password") passwordFromClient: string,
    @Ctx() context: any
  ) {
    try {
      if (process.env.JWT_SECRET_KEY === undefined) {
        throw new Error("NO JWT SECRET KEY DEFINED");
      }
      const userFromDB = await User.findOneByOrFail({ email: emailFromClient });
      console.log("UserFromDB", userFromDB);
      const isPasswordCorrect = await argon2.verify(
        userFromDB.hashedPassword,
        passwordFromClient
      );
      console.log("is password correct", isPasswordCorrect);
      if (isPasswordCorrect) {
        const token = jwt.sign(
          { id: userFromDB.id, email: userFromDB.email, role: userFromDB.role },
          process.env.JWT_SECRET_KEY
        );
        context.res.setHeader("Set-Cookie", `token=${token}; Secure; HttpOnly`);
        return "Login accepted";
      } else {
        throw new Error("Bad Login");
      }
    } catch (err) {
      console.log(err);
      throw new Error("Bad Login");
    }
  }

  @Mutation(() => String)
  async createUser(
    @Arg("email") email: string,
    @Arg("firstname") firstname: string,
    @Arg("lastname") lastname: string,
    @Arg("password") password: string
  ) {
    console.log("process", process.env);

    const hashedPassword = await argon2.hash(password);

    const userFromDB = await User.save({
      email: email,
      firstname: firstname,
      lastname: lastname,
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

  @Query(() => UserInfo)
  async whoAmI(@Ctx() context: Context) {
    if (context.id !== undefined) {
      const user = await User.findOneByOrFail({ id: context.id });
      return {
        email: user.email,
        role: user.role,
        firstname: user.firstname,
        lastname: user.lastname,
        isLoggedIn: true,
      };
    } else {
      return { isLoggedIn: false };
    }
  }
}

export default UserResolver;
