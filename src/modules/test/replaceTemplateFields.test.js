import replaceTemplateFields from '../template/replaceTemplateFields';
import fieldCodes from '../template/legalCodes';
const { defaultValue } = fieldCodes;

const testFieldValues = {
    inventor_name: 'John Doe',
    application_number: '14/123456789',
    title: '',
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
        'Multiple legal fields replace correctly', 
      template: 
        'These are legal field names: {firstInventor} hello world {applNumber}.', 
      expectedResult:
        `These are legal field names: ${testFieldValues.inventor_name} hello world ${testFieldValues.application_number}.`,
    },
    {
        description:
            'Fields at beginning and end are replaced correctly',
        template:
            '{firstInventor} hello world {applNumber}',
        expectedResult:
            `${testFieldValues.inventor_name} hello world ${testFieldValues.application_number}`,
    },
    {
        description:
            'Fields with blank values are replaced by default value.',
        template:
            'The default value of {title} replaces empty values.',
        expectedResult:
            `The default value of ${defaultValue} replaces empty values.`,
    },
];

for (let testCase of testTemplate) {
    test(`${testCase.description}`, () => {
        expect(replaceTemplateFields(testCase.template, testFieldValues))
            .toBe(testCase.expectedResult);
    });
}