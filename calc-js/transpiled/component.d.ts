// world root:component/root
/**
* # Variants
* 
* ## `"increment"`
* 
* ## `"decrement"`
*/
export type Operation = 'increment' | 'decrement';
export type * as MathIncInc from './interfaces/math-inc-inc.js'; // import math:inc/inc
export function calc(operation: Operation, num: bigint): bigint;
