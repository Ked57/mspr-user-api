extern crate uuid;
#[macro_use]
extern crate diesel;
extern crate serde;

pub mod schema;
pub mod models;
pub mod db;

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}
