const {expect, test} = require('@jest/globals');

const { isNotUndefined, validateCnpj, validatePassword } = require('../src/utils/validateInput');

test('undefined Input', () => {
    expect(isNotUndefined(undefined)).toBeFalsy()
});

test('valid Input', () => {
    expect(isNotUndefined('12345')).toBeTruthy()
});

test('undefined passwords', () => {
    expect(validatePassword(undefined)).toBeFalsy()
});

test('small passwords', () => {
    expect(validatePassword('Aa1')).toBeFalsy()
});

test('no lowercase passwords', () => {
    expect(validatePassword('A1234567')).toBeFalsy()
});

test('no uppercase passwords', () => {
    expect(validatePassword('a1234567')).toBeFalsy()
});

test('valid passwords', () => {
    expect(validatePassword('Aa123456')).toBeTruthy()
});

test('small cnpj', () => {
    expect(validateCnpj('12345')).toBeFalsy()
});

test('big cnpj', () => {
    expect(validateCnpj('12345678901234567890')).toBeFalsy()
});

test('letter in cnpj', () => {
    expect(validateCnpj('A1234567890123')).toBeFalsy()
});

test('valid cnpj', () => {
    expect(validateCnpj('12345678912345')).toBeTruthy()
});
