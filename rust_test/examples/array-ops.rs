pub fn get_min(arr: &Vec<i32>) -> Option<&i32> {
    arr.iter().min()
}

fn main() {
    let arr = vec![2, 4, 1, 4, 5, 1, 6, 4, -1, 6, 0, -2];
    let min = arr.iter().min();
    println!("{}", min.unwrap());
}

// This time I also tried implementing testing.
// It just seems more better to test the app before running or deploying
#[cfg(test)]
mod tests {
    use super::get_min;

    #[test]
    fn minimum_number() {
        let arr = vec![2, 4, 1, 4, 5, 1, 6, 4, -1, 6, 0, -2];
        if let Some(num) = get_min(&arr) {
            assert_eq!(
                *num, -2,
                "The minimum number should be -2 and it is {}",
                num
            );
        }
    }
}
