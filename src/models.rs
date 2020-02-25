use uuid::Uuid;
use crate::schema::user;
use serde::{Deserialize, Serialize};

#[derive(Queryable, Serialize, Deserialize)]
pub struct User {
    pub id: Uuid,
    pub user_id: String,
    pub user_name: String,
}

#[derive(Insertable)]
#[table_name = "user"]
pub struct NewUser {
    pub user_id: String,
    pub user_name: String,
}