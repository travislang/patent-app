import templateIsLegal from '../template/parseTemplate';

const testTemplate = [
    { description: 'Undefined template returns false', template: undefined, expectedResult: false },
    { description: 'Null template returns false', template: null, expectedResult: false },
    { description: 'Empty template returns false', template: '', expectedResult: false },
    { description: 'Brackets in matching pairs return true', template: 'Hello world {field} hello world {field}.' , expectedResult: true },
    { description: 'Templates without brackets return true', template: 'Hello world no brackets.' , expectedResult: true },
    { description: 'Nested brackets not allowed', template: 'Hello world {field {field} }', expectedResult: false },
    // { description: '', template: , expectedResult:  },
];

for (let testCase of testTemplate) {
    test(`${testCase.description}`, () => {
        expect(templateIsLegal(testCase.template)).toBe(testCase.expectedResult);
    });
}
