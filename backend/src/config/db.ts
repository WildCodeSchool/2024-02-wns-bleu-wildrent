import { Article } from "../entities/article";
import { Product } from "../entities/product";
import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "postgres",
  password: "example",
  database: "postgres",
  synchronize: true,
  logging: ["error", "query"],
  entities: [Product, Article],
});
