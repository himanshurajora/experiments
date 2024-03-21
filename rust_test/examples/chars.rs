use std::collections::HashMap;

fn main() {
    let input = String::from("aaaabbbbcccddee");

    let mut map: HashMap<char, u16> = HashMap::new();

    for ch in input.chars() {
        println!("{}", &ch);
        let count = map.get(&ch);

        if let Some(c) = count {
            map.insert(ch.to_owned(), c + 1);
        } else {
            map.insert(ch.to_owned(), 1);
        }
    }
    println!("{:?}", map);
}
