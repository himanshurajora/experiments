fn main() {
    let args: Vec<_> = std::env::args().collect();

    let file_name = args.get(1).expect("Unable to get file args");

    let file = std::fs::read_to_string(&file_name).expect("unable to read file");

    file.lines().for_each(|line| {
        if let Ok(value) = line.parse::<usize>() {
            println!("{value}");
        } else {
            println!("Line is not a number");
        }
    });

    let a = "this must be worng";
    println!("Args were: {:?}", args);
}
