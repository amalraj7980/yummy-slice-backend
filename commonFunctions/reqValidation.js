exports.validate = (req) => {
    // const isEmpty = Object.values(req).every(x => x === null || x === '');
    for (var key in req) {
        if (req[key] === null || req[key] == "")
            return false;
    }
    return true;
}