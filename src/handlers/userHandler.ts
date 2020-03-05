import { of } from "await-of";
import { badRequest, internal, notFound } from "@hapi/boom";
import { user, FindOneuserArgs } from "@prisma/client";

export const userHandler = async (
  paramId: string,
  userFindOne: (args: FindOneuserArgs) => Promise<user>
) => {
  if (!paramId) {
    console.error("Error: no id provided");
    return badRequest("no id provided");
  }
  const [res, err] = await of(userFindOne({ where: { "auth_id": paramId } }));
  if (err) {
    console.error(err);
    return internal(`Error: { name : ${err.name} message: ${err.message} }`);
  }
  if (!res) {
    return notFound("wrong id provided");
  }
  return res;
};
