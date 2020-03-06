import { of } from "await-of";
import { badRequest, internal, notFound } from "@hapi/boom";
import {
  user,
  FindOneuserArgs,
  userCreateArgs,
  userUpdateArgs
} from "@prisma/client";
import { isUser } from "../utils/user.type";
import { ResponseToolkit } from "@hapi/hapi";

export const userHandler = async (
  paramId: string,
  userFindOne: (args: FindOneuserArgs) => Promise<user>
) => {
  if (!paramId) {
    console.error("Error: no id provided");
    return badRequest("no id provided");
  }
  const [res, err] = await of(userFindOne({ where: { auth_id: paramId } }));
  if (err) {
    console.error(err);
    return internal(`Error: { name : ${err.name} message: ${err.message} }`);
  }
  if (!res) {
    return notFound("wrong id provided");
  }
  return res;
};

export const putUserHandler = async (
  h: ResponseToolkit,
  user: any,
  userCreate: (args: userCreateArgs) => Promise<user>
) => {
  if (!isUser(user)) {
    return badRequest("provided payload isn't of user type");
  }
  const [res, err] = await of(userCreate({ data: user }));
  if (err) {
    console.error(err);
    return internal(`Error: { name : ${err.name} message: ${err.message} }`);
  }
  if (!res) {
    return internal("No user created");
  }
  return h.response(res).code(201);
};

export const postUserHandler = async (
  h: ResponseToolkit,
  user: any,
  userUpdate: (args: userUpdateArgs) => Promise<user>
) => {
  if (!isUser(user)) {
    return badRequest("provided payload isn't of user type");
  }
  console.log("user", user);
  const [res, err] = await of(
    userUpdate({ data: user, where: { auth_id: user.auth_id } })
  );
  if (err) {
    console.error(err);
    return notFound(`Error: { name : ${err.name} message: ${err.message} }`);
  }
  if (!res) {
    return internal("No user updated");
  }
  return h.response(res).code(200);
};
