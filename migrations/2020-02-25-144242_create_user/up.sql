-- Your SQL goes here

CREATE EXTENSION pgcrypto; 

CREATE TABLE "user" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR NOT NULL UNIQUE,
    user_name VARCHAR NOT NULL UNIQUE
);