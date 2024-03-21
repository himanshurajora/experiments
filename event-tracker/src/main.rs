// use rocket::serde

use rocket::response::content::RawJson;
#[macro_use]
extern crate rocket;

struct Test {
    id: i32,
}

#[get("/")]
fn index() -> RawJson<String> {
    // let test = Test { id: 1 };
    // let json = serde_json::to_string(&test).unwrap();
    RawJson("{\"id\": 1}".to_string())
}

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![index])
}
