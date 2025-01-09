import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { dataSource } from "./config/db";
import { buildSchema } from "type-graphql";
import ProductResolver from "./resolvers/ProductResolver";
import ArticleResolver from "./resolvers/ArticleResolver";
import UserResolver from "./resolvers/UserResolver";
import "dotenv/config";
import setCookieParser from "set-cookie-parser";
import jwt from "jsonwebtoken";
import ReservationResolver from "./resolvers/ReservationResolver";
import PaymentResolver from "./resolvers/PaymentResolver";

export type Context = {
  id: string;
  email: string;
  role: "Admin" | "User";
};

const start = async () => {
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers: [
      ProductResolver,
      ArticleResolver,
      UserResolver,
      ReservationResolver,
      PaymentResolver
    ],
    authChecker: ({ context }: { context: Context }, roles) => {
      console.log("roles for this query/mutation ", roles);
      if (!context.email) {
        return false;
      }


      if (roles.length === 0) {
        return true;
      }

     
      if (roles.includes(context.role)) {
        return true;
      } else {
        return false;
      }
    },
  });

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
      if (process.env.JWT_SECRET_KEY === undefined) {
        throw new Error("NO JWT SECRET KEY CONFIGURED");
      }
      const cookies = setCookieParser.parse(req.headers.cookie ?? "", {
        map: true,
      });

      if (cookies.token && cookies.token.value) {
        const payload = jwt.verify(
          cookies.token.value,
          process.env.JWT_SECRET_KEY
        ) as jwt.JwtPayload;
        if (payload) {
          return { ...payload, res: res };
        }
      }
      return {
        res: res,
      };
    },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

start();
