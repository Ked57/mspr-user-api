import test from "ava";
import { userHandler } from "../../src/handlers/userHandler";
import { userFindOneMock, userMock } from "../../mock/user";

test("/user/{id} returns an user", async t => {
  const paramId = "1";
  const result = await userHandler(paramId, userFindOneMock);
  t.log("result", result);
  t.deepEqual(
    result,
    userMock.find(value => value.auth_id === paramId)
  );
});

test("/user/{id} fails if a wrong id is passed", async t => {
  const paramId = "not ok";
  const result = await userHandler(paramId, userFindOneMock);
  t.log("result", result);
  t.deepEqual(result.message, "wrong id provided");
});
