import { inc } from 'math:inc/inc'

export function calc(operation, number) {
  switch (operation) {
    case 'increment': return inc(number)
  }
}

