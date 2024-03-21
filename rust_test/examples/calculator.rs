use std::env::{args, Args};
// ready to make a really great calculator
fn main() {
    let mut arr: Args = args();

    // println!("{:?}", args);
    let first = arr.nth(1).expect("Please provide the first argument");
    let op = arr.nth(0).expect("Please provide the oprator");
    let second = arr.nth(0).expect("Please provide the the second argument");

    let n1 = first
        .parse::<f32>()
        .expect("Could not parse number 1, please check you format");
    let n2 = second
        .parse::<f32>()
        .expect("Could not parse number 2, please check you format");

    let ans = operate(n1, op, n2);

    println!("The answer is {}", ans);
}

fn operate(n1: f32, op: String, n2: f32) -> f32 {
    let ans = match op.as_str() {
        "+" => n1 + n2,
        "-" => n1 - n2,
        "/" => n1 / n2,
        "*" => n1 * n2,
        _ => panic!("Please provide a valid oprator"),
    };

    ans
}
