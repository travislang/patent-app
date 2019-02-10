import { claimsArePlural, claimOrClaims, claimIsAre } from '../template/claimsFields';

const testCases = [
        { description: 'Single-digit claim is singular.', claim: '1', expectedResult: false, claimS: ' 1' },
        { description: 'Multi-digit claim is singluar', claim: '10', expectedResult: false, claimS: ' 10' },
        { description: 'Claim range is plural', claim: '1-5', expectedResult: true, claimS: 's 1-5' },
        { description: 'Empty claim returns false (arbitrary)', claim: '', expectedResult: false, claimS: ' ' },
        { description: 'Null claim returns false (arbitrary)', claim: null, expectedResult: false, claimS: ' ' },
        // { description: '', claim: , expectedResult:  },
]

for (let testCase of testCases) {
    test(`${testCase.description}`, () => {
        expect(claimsArePlural(testCase.claim))
            .toBe(testCase.expectedResult);
    });
}

for(let testCase of testCases) {
    test(`${testCase.description}`, () => {
        expect(claimOrClaims(testCase.claim))
            .toBe(testCase.claimS);
    });
}