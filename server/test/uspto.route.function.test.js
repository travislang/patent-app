const changeToNumber = (str) => {
    let num = +str.replace(/[^0-9.]/g,"");
    return num
}

export default changeToNumber;