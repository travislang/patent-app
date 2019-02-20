import templateIsLegal from '../template/verifyTemplate';

const testTemplate = [
    { description: 'Undefined template returns false', template: undefined, expectedResult: false },
    { description: 'Null template returns false', template: null, expectedResult: false },
    { description: 'Empty template returns false', template: '', expectedResult: false },
    { description: 'Brackets in matching pairs and legal fields return true', template: 'Hello world-these are legal field names: {inventorName} hello world {applNumber}.' , expectedResult: true },
    { description: 'Templates without brackets return true', template: 'Hello world no brackets.' , expectedResult: true },
    { description: 'Extra closing bracket returns false', template: 'First some text and a {applicantName} } and more text', expectedResult: false },
    { description: 'Extra closing bracket returns false', template: 'First a closing } bracket and a {applicantName} and more text', expectedResult: false },
    { description: 'Nested brackets not allowed', template: 'Hello world {field {field} }', expectedResult: false },
    { description: 'Illegal fields not allowed', template: 'This is not a legal field name: {notafield}', expectedResult: false },
    // { description: '', template: , expectedResult:  },
];

for (let testCase of testTemplate) {
    test(`${testCase.description}`, () => {
        expect(templateIsLegal(testCase.template)).toBe(testCase.expectedResult);
    });
}