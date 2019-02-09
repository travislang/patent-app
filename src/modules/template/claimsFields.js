const claimsArePlural = (claims) => {
    // considered plural if any commas or dashes are present
    return claims.match(/[,;:-]/);
}

const claims = {
    claimsArePlural,
};

export default claims;