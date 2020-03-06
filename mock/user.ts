import { FindOneuserArgs, user } from "@prisma/client";

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
  Promise.reject({name: "error", message: "test"});
