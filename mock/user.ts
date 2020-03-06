import {
  FindOneuserArgs,
  user,
  userCreateArgs,
  userUpdateArgs
} from "@prisma/client";
import { isUser } from "../src/utils/user.type";

export const userMock = [
  {
    auth_id: "1",
    user_name: "bobo cargo"
  }
];

export const userFindOneMock = (args: FindOneuserArgs) =>
  Promise.resolve(
    userMock.find(value => value.auth_id === args.where.auth_id) as user
  );

export const userFindOneThrowMock = (args: FindOneuserArgs) =>
  Promise.reject({ name: "error", message: "test" });

export const userCreateMock = (args: userCreateArgs) => {
  const user = args.data;
  if (!isUser(user)) {
    return Promise.reject({
      name: "bad request",
      message: `Provided user isn't of User type, ${user}`
    });
  }
  return Promise.resolve(user);
};

export const hMock = {
  response: (arg: any) => ({
    code: (code: number) => arg
  })
};

export const userUpdateMock = (args: userUpdateArgs) => {
  const user = args.data;
  if (!user || !user.auth_id) {
    return Promise.reject({
      name: "bad request",
      message: `Provided user isn't of User type, ${user}`
    });
  }
  return Promise.resolve(user as user);
};
