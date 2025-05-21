wit_bindgen::generate!({ generate_all });

use exports::wasi::cli::run::Guest;

struct CalcCli;

impl Guest for CalcCli {
    fn run() -> Result<(), ()> {
        let mut args = std::env::args();
        args.next();
        let op = match args.next().as_deref() {
            Some("increment") => Operation::Increment,
            Some("decrement") => Operation::Decrement,
            _ => return Err(()),
        };
        let num = args
            .next()
            .map(|dingen| dingen.parse().unwrap_or(0))
            .unwrap_or(0);

        println!("{}", calc(op, num));
        Ok(())
    }
}

export!(CalcCli);
