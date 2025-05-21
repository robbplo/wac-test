wit_bindgen::generate!({ generate_all });

struct Calc;

impl Guest for Calc {
    fn calc(operation: Operation, num: u64) -> u64 {
        match operation {
            Operation::Decrement => dec(num),
            Operation::Increment => inc(num),
        }
    }
}

export!(Calc);

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_decs() {
        let result = Calc::calc(Operation::Decrement, 2);
        assert_eq!(result, 1);
    }

    #[test]
    fn it_incs() {
        let result = Calc::calc(Operation::Increment, 2);
        assert_eq!(result, 3);
    }
}
