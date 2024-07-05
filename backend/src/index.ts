import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { dataSource } from "./config/db";
import { buildSchema } from "type-graphql";
import ProductResolver from "./resolvers/ProductResolver";
import ArticleResolver from "./resolvers/ArticleResolver";
import UserResolver from "./resolvers/UserResolver";
import "dotenv/config";

const start = async () => {
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers: [ProductResolver, ArticleResolver, UserResolver],
  });

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

start();
