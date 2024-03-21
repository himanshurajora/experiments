use linked_list::first::List;

fn main() {

    let list = List::Elem(1, Box::new(List::Elem(2, Box::new(List::Empty))));

    println!("{:?}", list);

}
