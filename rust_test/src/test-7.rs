use std::{fmt::Display, io, vec};

struct Rect {
    x: i32,
    y: i32,
    width: i32,
    height: i32,
}

impl Display for Rect {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            "Rect ({}, {}) {}x{}",
            self.x, self.y, self.width, self.height
        )
    }
}

struct RectIter {
    points: Vec<(i32, i32)>,
    idx: usize,
}

impl Iterator for RectIter {
    type Item = (i32, i32);

    fn next(&mut self) -> Option<Self::Item> {
        let idx = self.idx;
        self.idx += 1;
        return self.points.get(idx).map(|x| *x);
    }
}

impl IntoIterator for &Rect {
    type Item = (i32, i32);

    type IntoIter = RectIter;
    fn into_iter(self) -> Self::IntoIter {
        return RectIter {
            points: vec![
                (self.x, self.y),
                (self.x + self.width, self.y),
                (self.x, self.y + self.y + self.height),
                (self.x + self.width, self.y + self.height),
            ],
            idx: 0,
        };
    }
}

fn main() {
    // implement display trait test
    let r = Rect {
        x: 10,
        y: 10,
        width: 100,
        height: 120,
    };

    r.into_iter().for_each(|p|{
        println!("{}, {}", p.0, p.1);
    });

    println!("{}", r);

}
