use sysinfo::{ProcessExt, System, SystemExt};

fn main() {
    let s = System::new_all();

    for process in s.processes() {
        println!("{:?}, {}", process.0, process.1.name())
    }
}
