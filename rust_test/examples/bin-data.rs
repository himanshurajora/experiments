use std::{
    fs::File,
    io::{Read, Write},
};

use bincode::{deserialize_from, serialize};
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Debug)]
struct Player {
    name: String,
}

fn main() {
    let player = Player {
        name: "Himanshu".to_string(),
    };

    let s = serialize(&player).unwrap();
    let mut file = File::create("test.bin").expect("Created file test.bin");
    file.write_all(&s).unwrap();
   
    let mut file2 = File::open("test.bin").unwrap();
    let mut buf: Vec<u8> = Vec::new();

    file2.read_to_end(&mut buf).unwrap();
    let player_des: Player = deserialize_from(&buf[..]).unwrap();

    println!("{:?}", player_des);
}
