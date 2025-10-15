const isUndefined = (data) => {
    if (data === undefined) { return true }
    return false
}

const invalidCnpj = (cnpj) => {
    if (cnpj === undefined) { return true }
    cnpj = cnpj.trim()
    if (cnpj.length !== 14) { return true }
    if (cnpj.match(/[a-z]/g) !== null) { return true }
    if (cnpj.match(/[A-Z]/g) !== null) { return true }
    return false
}

const invalidPassword = (password) => {
    if (password === undefined) { return true }
    password = password.trim()
    if (password.length < 8) { return true }
    if (password.match(/[a-z]/g) === null) { return true }
    if (password.match(/[A-Z]/g) === null) { return true }
    if (password.match(/[0-9]/g) === null) { return true }
    return false
}

module.exports = {
    isUndefined,
    invalidCnpj,
    invalidPassword,
};
