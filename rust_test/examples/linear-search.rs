// I want to do a bunch of rust things,
// so searching and sorting would be good
use std::process::exit;

fn main() {
    let arr = [2, 4, 6];
    let key = 5;
    for i in 0..arr.len() {
        if arr[i] == key {
            println!("found key at index {}", i);
            exit(1);
        }
    }

    println!("couldn't find key");
}
