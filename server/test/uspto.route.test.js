// test for function in uspto

        test(`changing application id string into USPTO require format for application id`, ()=>{
            let str = "14/58886";
            function changeToNumber(str){
                let num = +str.replace(/[^0-9.]/g,"");
                return num
            }
            expect(changeToNumber(str)).toBe('1458886');
        })