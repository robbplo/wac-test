#[allow(warnings)]
mod bindings;

use bindings::Guest;

struct Component;

impl Guest for Component {
    fn inc(num: u64) -> u64 {
        num + 1
    }
}

bindings::export!(Component with_types_in bindings);
