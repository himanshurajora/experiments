use std::fmt::Debug;

#[derive(Debug)]
struct List<T> {
    head: Option<Node<T>>
}

#[derive(Debug)]
struct Node<T> {
    value: T,
    next:  Option<Box<Node<T>>>
}

impl <T: Debug> List<T> {
   fn display(mut self) {
        let binding = self.head.take();
        let mut current = binding.as_ref();

        while let Some(node) = current {
            current = node.next.as_ref()
                .map(|boxed_node| &**boxed_node);
            print!("{:?}, ", &node.value);
        }
    } 
}


fn main() {
    let mut list: List<isize> = List {
        head: None
    };

    list.head = Some(Node {
        value: 1,
        next: Some(Box::new(Node {value: 2, next: None}))
    });

    list.display();
    // println!("{:?}", l);
}
