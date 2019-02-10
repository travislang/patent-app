import claimsArePlural from '../template/claimsFields';

const testCases = [
        { description: 'Single-digit claim is singular.', claim: '1', expectedResult: false },
        { description: 'Multi-digit claim is singluar', claim: '10', expectedResult: false },
        { description: 'Claim range is plural', claim: '1-5', expectedResult: true },
        { description: 'Empty claim returns false (arbitrary)', claim: '', expectedResult: false },
        { description: 'Null claim returns false (arbitrary)', claim: null, expectedResult: false },
        // { description: '', claim: , expectedResult:  },
]

for (let testCase of testCases) {
    console.log('just trying', claimsArePlural('1'));
    test(`${testCase.description}`, () => {
        expect(claimsArePlural(testCase.claim))
            .toBe(testCase.expectedResult);
    });
}