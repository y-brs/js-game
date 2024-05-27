export function deepClone(array) {
  return array.map((innerArray) => [...innerArray]);
}
