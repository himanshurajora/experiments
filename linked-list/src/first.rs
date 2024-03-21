#[derive(Debug)]
pub enum List<T> {
    Elem(T, Box<List<T>>),
    Empty
}


