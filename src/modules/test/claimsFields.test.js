import { claimsArePlural, claimOrClaims, claimIsAre } from '../template/claimsFields';

const testCases = [
    { description: 'Single-digit claim is singular.', claim: '1', expectedResult: false, claimS: ' 1', isAre: ' 1 is' },
    { description: 'Multi-digit claim is singluar', claim: '10', expectedResult: false, claimS: ' 10', isAre: ' 10 is' },
    { description: 'Claim range is plural', claim: '1-5', expectedResult: true, claimS: 's 1-5', isAre: 's 1-5 are' },
    { description: 'Single claim and range is plural', claim: '14, 20-24', expectedResult: true, claimS: 's 14, 20-24', isAre: 's 14, 20-24 are' },
    { description: 'Claim range and single is plural', claim: '6-8, 4', expectedResult: true, claimS: 's 6-8, 4', isAre: 's 6-8, 4 are' },
    { description: 'Empty claim returns false (arbitrary)', claim: '', expectedResult: false, claimS: ' ', isAre: '  is' },
    { description: 'Null claim returns false (arbitrary)', claim: null, expectedResult: false, claimS: ' ', isAre: '  is' },
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

for (let testCase of testCases) {
    test(`${testCase.description}`, () => {
        expect(claimIsAre(testCase.claim))
            .toBe(testCase.isAre);
    });
}