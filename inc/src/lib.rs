wit_bindgen::generate!({ generate_all });

use crate::exports::math::inc::inc::Guest;

struct Inc;

impl Guest for Inc {
    fn inc(num: u64) -> u64 {
        num + 1
    }
}

export!(Inc);
