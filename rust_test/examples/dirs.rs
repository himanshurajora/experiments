use std::fs::{self, read_dir};

fn main () {
    let files = match read_dir("./") {
        Ok(paths) => paths,
        Err(_) => panic!("SOME ERROR")
    };

    for file in files {
        println!("Name: {:?}", file.unwrap().path().to_str());
    }

    // println!("{:?}", files);

}


