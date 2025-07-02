// world root:component/root
/**
* # Variants
* 
* ## `"increment"`
* 
* ## `"decrement"`
*/
export type Operation = 'increment' | 'decrement';
export function calc(operation: Operation, num: bigint): bigint;
