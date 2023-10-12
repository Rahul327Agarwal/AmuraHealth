export function nearlyEqual(a: number, b: number, threshold: number = 0.001) {
  return Math.abs(a - b) < threshold;
}
