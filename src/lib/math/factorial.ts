import { ln } from './logs'
import { MAX_SAFE_INTEGER } from './math'

/**
 * Computes the factorial in log space as a sum of logs.
 *
 * @param x an integer
 * @returns
 */
export function factorialLn(x: number): number {
  // for property 0! = 1 since exp(0) == 1
  if (x < 1) {
    return NaN
  }

  let result = 0

  for (let i = 1; i <= x; i++) {
    result += ln(i)
  }

  return result
}

export function factorialBigInt(n: number): bigint {
  if (n < 0) {
    return -1n
  }

  if (n === 0) {
    return 1n
  }

  let result = BigInt(1)
  for (let i = 1; i <= n; i++) {
    result *= BigInt(i)
  }
  return result
}

export function factorial(n: number): number {
  const result = factorialBigInt(n)

  return result > 0 && result <= MAX_SAFE_INTEGER ? Number(result) : NaN
}
