use crate::models::User;


use crate::diesel::prelude::*;

use dotenv::dotenv;
use std::env;

pub fn establish_connection() -> PgConnection {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    PgConnection::establish(&database_url).expect(&format!("Error connecting to {}", database_url))
}

pub fn create_user(user: User) {}

pub fn retrieve_user(user_id_parameter: String) -> Vec<User> {
    use crate::schema::user::dsl::*;

    let connection = establish_connection();
    user.filter(user_id.eq(user_id_parameter))
        .load::<User>(&connection)
        .expect("Error loading users")
}
