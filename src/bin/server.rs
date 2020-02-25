use actix_web::{get, put, web, App, HttpServer, Responder};
use serde::{Serialize};

use MSPR_CI_User::db::retrieve_user;
#[derive(Serialize)]
struct JsonError {
    error: String,
}

#[put("/user")]
async fn new_user() -> impl Responder {
    format!("Hello")
}

#[get("/user")]
async fn index() -> impl Responder {
    match serde_json::to_string(&retrieve_user("".to_owned())) {
        Ok(result) => Ok(web::Json(result)),
        Err(e) => Err(e)
    }
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| App::new().service(index))
        .bind("127.0.0.1:8080")?
        .run()
        .await
}