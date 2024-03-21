use std::{io, fmt::Display};

struct Rect {
    x: i32,
    y: i32,
    width: i32,
    height: i32
}

impl Display for Rect {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "Rect ({}, {}) {}x{}", self.x, self.y, self.width, self.height)
    }
}

fn main() {
    // implement display trait test
    let r = Rect {x: 10, y: 10, width: 100, height: 120};

    println!("There it is: {r}") 
}
