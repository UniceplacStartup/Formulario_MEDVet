const isNotUndefined = (data) => {
    if (data === undefined) { return false }
    return true 
}

const validateCnpj = (cnpj) => {
    if (cnpj === undefined) { return false }
    if (cnpj.length !== 14) { return false }
    if (cnpj.match(/[a-z]/g) !== null) { return false }
    if (cnpj.match(/[A-Z]/g) !== null) { return false }
    return true 
}

const validatePassword = (password) => {
    if (password === undefined) { return false }
    if (password.length < 8) { return false }
    if (password.match(/[a-z]/g) === null) { return false }
    if (password.match(/[A-Z]/g) === null) { return false }
    if (password.match(/[0-9]/g) === null) { return false }
    return true 
}

module.exports = {
    isNotUndefined,
    validateCnpj,
    validatePassword,
};
