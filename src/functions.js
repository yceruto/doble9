export function sideA(number) {
    return parseInt(number);
}

export function sideB(number) {
    return Math.round((number - parseInt(number)) * 10);
}

export function isDoubleSide(number) {
    return sideA(number) === sideB(number);
}