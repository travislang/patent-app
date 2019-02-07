import replaceTemplateFields from '../template/replaceTemplateFields';

const testFieldValues = {
    inventor_name: 'John Doe',
    application_number: '14/123456789',
};

const testTemplate = [
    { description: 
        'Templates without brackets returns unchanged.', 
      template: 
        'Hello world no brackets.', 
      expectedResult:
        'Hello world no brackets.'    
    },
    { description: 
        'Brackets in matching pairs and legal fields return true', 
      template: 
        'These are legal field names: {firstInventor} hello world {applNumber}.', 
      expectedResult:
        `These are legal field names: ${testFieldValues.inventor_name} hello world ${testFieldValues.application_number}.`,
    },
    // { description: 'Nested brackets not allowed', template: 'Hello world {field {field} }', expectedResult: false },
    // { description: 'Illegal fields not allowed', template: 'This is not a legal field name: {notafield}', expectedResult: false },
    // { description: '', template: , expectedResult:  },
];

for (let testCase of testTemplate) {
    test(`${testCase.description}`, () => {
        expect(replaceTemplateFields(testCase.template, testFieldValues)).toBe(testCase.expectedResult);
    });
}

// test('test', () => {
//     expect(replaceFieldsInTemplate('hello world', legalCodes, keys).toBe('hello world'))
// });
