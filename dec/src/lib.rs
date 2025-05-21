wit_bindgen::generate!({ generate_all });


// // use crate::exports::math::dec::dec::Guest; 
//
struct Dec;

impl Guest for Dec {
    fn dec(num: u64) -> u64 {
        num - 1
    }
}

export!(Dec);
