export function sideA(number) {
    return parseInt(number);
}

export function sideB(number) {
    return Math.round((number - parseInt(number)) * 10);
}

export function isDoubleSide(number) {
    return sideA(number) === sideB(number);
}

export function isSame(a, b) {
    return sideA(a) === sideA(b) && sideB(a) === sideB(b) || sideA(a) === sideB(b) && sideB(a) === sideA(b);
}