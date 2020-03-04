import test from "ava";
import { PrismaClient } from "@prisma/client";
import fetch from "node-fetch";
import { main } from "../../src/app";
import { of } from "await-of";
import { isUser } from "../../src/utils/user.type";

const port = "10000";

test.before(async t => {
  const [{ app, address }, err] = await of(main(port));
  if (err) {
    t.fail(err.message);
  }
  (t.context as any)["server"] = app;
  (t.context as any)["baseUrl"] = address;
  const prisma = new PrismaClient();
  prisma.user.upsert({
    create: {
      auth_id: "1",
      user_name: "bobo cargo"
    },
    update: {
      auth_id: "1",
      user_name: "bobo cargo"
    },
    where: {
      auth_id: "1"
    }
  });
});

test.after(async t => {
  (t.context as any)["server"].stop();
});

test("/user/{id} returns a user", async t => {
  const response = await fetch(`http://localhost:${port}/user/1`);
  const user = await response.json();
  t.assert(
    isUser(user),
    `Expected /user/{id} result to be of type User, instead got ${user}`
  );
});

test("/user returns a 404 error", async t => {
  const response = await fetch(`http://localhost:${port}/user`);
  const err = await response.json();
  t.assert(
    err.statusCode === 404,
    `Expected /user result to be a 404 error, instead got ${err}`
  );
});
