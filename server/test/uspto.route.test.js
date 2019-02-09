// test for function in uspto
import changeToNumber from './uspto.route.function.test';

        test(`changing application id string into USPTO require format for application id`, ()=>{
            let str = "14/58886";
            expect(changeToNumber(str)).toBe(1458886);
        })