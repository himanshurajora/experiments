// a simple macro two say hello world
macro_rules! hello {
    ($name: expr) => {
        println!("Hello, {}", $name)
    };
}

// now get two numbers added
macro_rules! add {
    ($a: expr, $b: expr) => {
        $a + $b
    };
}

// create a function

macro_rules! create_fn {
    ($name: ident) => {
        fn $name() {
            println!("Called {:?}()", stringify!($name));
        }
    };
}

// just take something from there examples
// https://doc.rust-lang.org/rust-by-example/macros/overload.html
macro_rules! test {
    ($left:expr; and $right:expr) => {
        println!(
            "{:?} and {:?} is {:?}",
            stringify!($left),
            stringify!($right),
            $left && $right
        );
    };
}

// repeatative expressions
macro_rules! find_min {
    // so cool that it pattern matches automatically
    ($x: expr) => ($x);
    // I need to understand what it's doing in here bro
    ($x: expr, $($y: expr),+) => {
        std::cmp::min($x, find_min!($($y),+))
    };
}

// here is the most useful one
// something that can generate code for anything, in my case struct
macro_rules! generate_get_fun {
    ($strct_name:ident { $($field_name:ident : $field_type: ty),+ }) => {
       $(
            fn $field_name(&self) -> $field_type {
                self.$field_name.clone()
            }
        )*
    };
}

// I just want to generate simple thing
macro_rules! single {
    ($strct_name:ident { $field_name:ident : $field_type: ty }) => {
        // here we go with paste
        paste::item! {
            pub fn [< get_ $field_name >] (&self) -> $field_type {
                self.$field_name.clone()
        }
        }
    };
}

pub struct Person {
    name: String,
    age: i32,
}

impl Person {
    generate_get_fun!(Person {
        name: String,
        age: i32
    });
}

pub struct Object {
    size: i32,
}

impl Object {
    single!(Object { size: i32 });
}

create_fn!(foo);

fn main() {
    // let's have some simple ones
    hello!("Himanshu");
    println!("{} + {} = {}", 10, 20, add!(10, 20));
    // I really liked how it worked in here,
    // just so amazing I can't wait more to see what else can I do with a macro
    foo();

    // let's implement something more complex
    // I liked this one too, good going
    test!(true; and false);

    // find minimum number
    // and it works
    println!("{}", find_min!(3, 1, 5, 3, 2));

    // will check a few later
    // https://doc.rust-lang.org/rust-by-example/macros/dry.html
    let person = Person {
        name: "Himansh".to_string(),
        age: 20,
    };

    let name = person.name();
    let age = person.age();

    let object = Object { size: 3 };

    let size = object.get_size();
}
