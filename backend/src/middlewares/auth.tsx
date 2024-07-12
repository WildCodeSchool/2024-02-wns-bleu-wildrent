import { MiddlewareFn } from "type-graphql";
import jwt from "jsonwebtoken";
import { Context } from "../index";

export const isAuth: MiddlewareFn<Context> = ({ context }, next) => {
  const authorization = context.req.headers.get("authorization");
  if (!authorization) {
    throw new Error("Not authenticated");
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    context.payload = payload as any;
  } catch (err) {
    throw new Error("Not authenticated");
  }

  return next();
};

export const isAdmin: MiddlewareFn<Context> = ({ context }, next) => {
  if (!context.payload || context.payload.role !== "admin") {
    throw new Error("Not authorized as admin");
  }

  return next();
};
