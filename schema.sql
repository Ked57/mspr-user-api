CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "user"(
    auth_id text primary key,
    user_name text
);