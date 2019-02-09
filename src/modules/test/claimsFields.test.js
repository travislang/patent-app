import claims from '../template/claimsFields';
const { claimsArePlural } = claims;

const testCases = [
    
]

for (let testCase of testTemplate) {
    test(`${testCase.description}`, () => {
        expect(replaceTemplateFields(testCase.template, testFieldValues))
            .toBe(testCase.expectedResult);
    });
}