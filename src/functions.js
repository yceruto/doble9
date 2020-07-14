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

export function think(pieces, board, mode) {
    // get posible moves
    const head1 = board[0];
    const head2 = board[board.length - 1];
    const moves = [];

    for (const number of pieces) {
        const numberA = sideA(number);
        const numberB = sideB(number);
        const isDouble = isDoubleSide(number);

        if (sideA(head1.number) === numberB) {
            moves.push({
                position: 'left',
                number,
            });
        }

        if (sideA(head1.number) === numberA && !isDouble) {
            moves.push({
                position: 'left',
                number: numberB + numberA / 10,
            });
        }

        if (sideB(head2.number) === numberB) {
            moves.push({
                position: 'right',
                number: numberB + numberA / 10,
            });
        }

        if (sideB(head2.number) === numberA && !isDouble) {
            moves.push({
                position: 'right',
                number,
            });
        }
    }

    // modo novato
    if (mode === 0) {
        moves.sort(() => Math.random() - 0.5);
        return moves.pop();
    }

    // modo bota gorda
    if (mode === 1) {
        moves.sort((a, b) => sideA(a.number) + sideB(a.number) > sideA(b.number) + sideB(b.number) ? 1 : -1);
        return moves.pop();
    }

    return false;
}