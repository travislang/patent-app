const claimsArePlural = (claims) => {
    // considered plural if any commas or dashes are present
    return /[,;:-]/.test(claims);
}

export default claimsArePlural;