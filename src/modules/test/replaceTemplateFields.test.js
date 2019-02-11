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
        'These are legal field names: {inventorName} hello world {applNumber}.', 
      expectedResult:
        `These are legal field names: ${testFieldValues.inventor_name} hello world ${testFieldValues.application_number}.`,
    },
    {
        description:
            'Fields at beginning and end are replaced correctly',
        template:
            '{inventorName} hello world {applNumber}',
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

const claimTemplate = [
    {
        description:
            'Replacing empty claim field uses default value.',
        claims: '',
        template:
            'User entered empty claim{claim(s)}.',
        expectedResult:
            `User entered empty claim ${defaultValue}.`,
    },
    {
        description:
            'Singular claim replaced correctly.',
        claims: '1',
        template:
            'We are talking about claim{claim(s)}.',
        expectedResult:
            `We are talking about claim 1.`,
    },
    {
        description:
            'Plural claims replaced correctly.',
        claims: '1-5, 10',
        template:
            'We are talking about claim{claim(s)}.',
        expectedResult:
            `We are talking about claims 1-5, 10.`,
    },
    {
        description:
            'Singular claim with to be verb form replaced correctly.',
        claims: '1',
        template:
            'Claim{claim(s)is/are} all the rage.',
        expectedResult:
            `Claim 1 is all the rage.`,
    },
    {
        description:
            'Plural claims with to be verb form replaced correctly.',
        claims: '1-5, 10',
        template:
            'Claim{claim(s)is/are} all the rage.',
        expectedResult:
            `Claims 1-5, 10 are all the rage.`,
    },
    {
        description:
            'Multiple claim(s) fields are handled.',
        claims: '1-5, 10',
        template:
            'Claim{claim(s)is/are} all the rage because it is claim{claim(s)}.',
        expectedResult:
            `Claims 1-5, 10 are all the rage because it is claims 1-5, 10.`,
    },
    {
        description:
            'Multiple claim(s)is/are fields are handled.',
        claims: '1-5, 10',
        template:
            'Claim{claim(s)is/are} all the rage because it is claim{claim(s)}. And claim{claim(s)is/are} great!',
        expectedResult:
            `Claims 1-5, 10 are all the rage because it is claims 1-5, 10. And claims 1-5, 10 are great!`,
    }, {
        description:
            'Multiple claim(s) fields are handled.',
        claims: '1-5, 10',
        template:
            'This is about claim{claim(s)}. Claim{claim(s)is/are} all the rage because it is claim{claim(s)}. And claim{claim(s)is/are} great!',
        expectedResult:
            `This is about claims 1-5, 10. Claims 1-5, 10 are all the rage because it is claims 1-5, 10. And claims 1-5, 10 are great!`,
    },
];

for (let testCase of testTemplate) {
    test(`${testCase.description}`, () => {
        expect(replaceTemplateFields(testCase.template, testFieldValues))
            .toBe(testCase.expectedResult);
    });
}

for (let testCase of claimTemplate) {
    let { claims, description, template, expectedResult } = testCase;
    test(`${testCase.description}`, () => {
        expect(replaceTemplateFields(testCase.template, { ...testFieldValues, claims }))
            .toBe(testCase.expectedResult);
    });
}