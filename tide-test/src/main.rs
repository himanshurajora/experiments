use tide::prelude::*;
use tide::Request;

// #[derive(Debug, Deserialize)]
// struct Animal {
//     name: String,
//     legs: u8,
// }

#[async_std::main]
async fn main() -> tide::Result<()> {
    let mut app = tide::new();
    app.at("/orders/shoes").get(order_shoes);
    app.listen("127.0.0.1:8080").await?;
    println!("running the server");
    Ok(())
}

async fn order_shoes(mut _req: Request<()>) -> tide::Result {
    // let Animal { name, legs } = req.body_json().await?;
    Ok(format!("Hello, {}! I've put in an order for {} shoes", "hi", "bye").into())
}
