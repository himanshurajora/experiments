#[derive(Debug, Clone)]
struct User {
    name: String,
    age: i32,
}

impl User {
    pub fn set_age(&mut self, value: i32) -> User {
        self.age = value;
        self.clone()
    }
}

fn main() {
    let mut user = User {
        name: gstr("Himanshu"),
        age: 32,
    };

    let mut users = &vec![
        user.clone(),
        user.set_age(20),
        user.set_age(41),
        user.set_age(43),
        user.set_age(12),
    ];

    let names_only = map(
        &vec![
            user.clone(),
            user.set_age(20),
            user.set_age(41),
            user.set_age(43),
            user.set_age(12),
        ],
        |user, _index| {
            return user.name.clone();
        },
    );


    let filtered = filter(users, |user, _index|{
        user.age < 10
    });

    println!("Names only: {:?}", names_only);
    println!("Names only: {:?}", filtered);

}

fn gstr(input: &str) -> String {
    String::from(input)
}

fn map<T, U>(iterable: &Vec<T>, transformer: fn(&T, usize) -> U) -> Vec<U> {
    let mut i = 0;
    let mut result: Vec<U> = vec![];
    while i < iterable.len() {
        result.push(transformer(&iterable[i], i));
        i += 1;
    }

    result
}

fn filter<T: Clone>(iterable: &Vec<T>, predicate: fn(&T, usize) -> bool) -> Vec<T> {
    let mut i = 0;
    let mut result: Vec<T> = vec![];
    while i < iterable.len() {
        if predicate(&iterable[i].clone(), i) {
            result.push(iterable[i].clone())
        }
        i+=1;
    }

    result
}
