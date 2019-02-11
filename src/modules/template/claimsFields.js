const claimOrClaims = (claims) => {
    claims = fixNullOrUndefined(claims);
    if (claimsArePlural(claims)) {
        return `s ${claims}`;
    } else {
        return ` ${claims}`;
    }
};

const claimIsAre = (claims) => {
    claims = fixNullOrUndefined(claims);
    if (claimsArePlural(claims)) {
        return `s ${claims} are`;
    } else {
        return ` ${claims} is`;
    }
};

const claimsArePlural = (claims) => {
    // considered plural if a comma, dash, ampersand, or 'and' is present
    return /[,;:&-]/.test(claims)
        || /(and)/.test(claims);
};

const fixNullOrUndefined = (str) => {
    return str || '';
}

export {claimsArePlural};
export {claimIsAre};
export {claimOrClaims};