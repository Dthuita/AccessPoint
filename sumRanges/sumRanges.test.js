import { range, sum } from './sumRanges';

describe('sum', () => {
    test('it returns 0 when provided with an empty array', () => {
        expect(sum([])).toEqual(0);
    });

    test('it returns the sum for positive number', () => {
        expect(sum([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toEqual(55);
    });

    test('it returns the sum for negative number', () => {
        expect(sum([-1, -2, -3, -4, -5])).toEqual(-15);
    });
});

describe('range', () => {
    test('it returns a range counting up from the start to the end value', () => {
        expect(range(1, 10)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    test('it returns a range counting down from the start to the end value', () => {
        expect(range(10, 1)).toEqual([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
    });

    test('it uses negative step values when provided', () => {
        expect(range(5, 2, -1)).toEqual([5, 4, 3, 2]);
    })

    test('it uses positive step values when provided', () => {
        expect(range(0, 10, 5)).toEqual([0,5,10]);
    })

    test('it always returns at least the starting number', () => {
        expect(range(1, 10, 100)).toEqual([1]);
    })
});