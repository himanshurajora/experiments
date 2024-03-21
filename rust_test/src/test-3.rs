use std::io;


fn main() {
    let mut x = String::new();
    let mut y = String::new();


    io::stdin().read_line(&mut x).expect("Should have read x");
    io::stdin().read_line(&mut y).expect("Should have read y");

    let a = x.trim().parse::<i32>().unwrap();
    let b = x.trim().parse::<i32>().unwrap();

    println!("X = {}\n", a + b);    
}