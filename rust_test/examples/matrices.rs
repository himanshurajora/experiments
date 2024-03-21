


fn main() {

    let m1 = [
    [1, 2, 5],
    [1, 2, 3],
    [1, 2, 3],
    ];


    let m2 = [
    [1, 2, 3],
    [1, 2, 3],
    [1, 2, 3],
    ];


    let m3 = add(&m1, &m2);


    display(&m3);
}


fn add(m1: &[[i32;3]; 3], m2: &[[i32;3];3]) ->  [[i32;3];3] {
    let mut m3 = [[0,0,0], [0,0,0], [0,0,0]];

    let len = 3;

    for i in 0..len {
        for j in 0..len {
            m3[i][j] = m1[i][j] + m2[i][j];
        }
    }

    return m3;
}


fn  display(m:  &[[i32;3];3]) {
   let len = 3;
    for i in 0..len {
        print!("[");
        for j in 0..len {
            print!("{}, ", m[i][j]);
        }
        print!("]\n");
    }
}
