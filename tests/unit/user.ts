import test from "ava";
import { of } from "await-of";
import { userHandler, postUserHandler } from "../../src/handlers/userHandler";
import {
  userFindOneMock,
  userMock,
  userFindOneThrowMock,
  userCreateMock,
  hMock
} from "../../mock/user";
import { isUser } from "../../src/utils/user.type";

test("/user/{id} returns an user", async t => {
  const paramId = "1";
  const [result, err] = await of(userHandler(paramId, userFindOneMock));
  if (err) {
    t.fail(err.message);
  }
  t.deepEqual(
    result,
    userMock.find(value => value.auth_id === paramId)
  );
});

test("/user/{id} fails if a wrong id is passed", async t => {
  const paramId = "not ok";
  const [result, err] = await of(userHandler(paramId, userFindOneMock));
  if (err) {
    t.fail(err.message);
  }
  t.deepEqual(result.message, "wrong id provided");
});

test("/user/{id} fails if no id is passed", async t => {
  const paramId = undefined;
  const [result, err] = await of(userHandler(paramId as any, userFindOneMock));
  if (err) {
    t.fail(err.message);
  }
  t.deepEqual(result.message, "no id provided");
});

test("userHandler can handle orm errors", async t => {
  const paramId = "1";
  const [result, err] = await of(
    userHandler(paramId as any, userFindOneThrowMock)
  );
  if (err) {
    t.fail(err.message);
  }
  t.deepEqual(result.message, "Error: { name : error message: test }");
});

test("isUser guards the User type", t => {
  t.assert(
    isUser(userMock[0]),
    "isUser can't type guard the User type properly"
  );
});

test("POST /user creates a user", async t => {
  const user = userMock[0];
  const [result, err] = await of(
    postUserHandler(hMock as any, user, userCreateMock)
  );
  if (err) {
    t.fail(`Error: { name: ${err.name}, message: ${err.message}}`);
  }
  t.assert(
    result === user,
    `provided user and result don't match ${JSON.stringify(
      user
    )} === ${JSON.stringify(result)}`
  );
});

test("POST /user fails if the request isn't correct", async t => {
  const user = {} as any;
  const [result, err] = await of(
    postUserHandler(hMock as any, user, userCreateMock)
  );
  if (err) {
    t.fail(`Error { name: ${err.name}, message: ${err.message}}`);
  }
  t.assert(result.output.statusCode === 400, result.message);
});
