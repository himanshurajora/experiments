
#[derive(Debug)]
struct Stack<T> {
   elements: Vec<T> 
}

impl <T> Stack<T> {
    fn push(&mut self, value: T) {
        return self.elements.push(value);
    }

    fn pop(&mut self) -> Option<T>{
    return self.elements.pop();
}
}

fn main() {
    let mut stack: Stack<i32>= Stack { elements: vec![]};

    stack.push(12);
    stack.push(13);

    println!("{:?}", stack);

    stack.pop();

    println!("{:?}", stack);

}
