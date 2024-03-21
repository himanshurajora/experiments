#[derive(Debug)]
struct Test {
    name: String
}

fn main() {

    // I like the dbg! macro, it not only prints something
    // but also adds filename, lineno etc. useful information
    let a = vec![1, 2, 3];
    let test1 = Test {
        name: "Helloj".to_string()
    };
    dbg!(a);
    dbg!(&test1);
    dbg!(test1.name);
}

