const {expect, test} = require('@jest/globals');

const { isUndefined, invalidCnpj, invalidPassword } = require('../src/utils/validateInput');

test('undefined Input', () => {
    expect(isUndefined(undefined)).toBeTruthy()
});

test('valid Input', () => {
    expect(isUndefined('12345')).toBeFalsy()
});

test('undefined passwords', () => {
    expect(invalidPassword(undefined)).toBeTruthy()
});

test('small passwords', () => {
    expect(invalidPassword('Aa1')).toBeTruthy()
});

test('no lowercase passwords', () => {
    expect(invalidPassword('A1234567')).toBeTruthy()
});

test('no uppercase passwords', () => {
    expect(invalidPassword('a1234567')).toBeTruthy()
});

test('white spaces passwords', () => {
    expect(invalidPassword('Aa1234    ')).toBeTruthy()
});

test('valid passwords', () => {
    expect(invalidPassword('Aa123456')).toBeFalsy()
});

test('small cnpj', () => {
    expect(invalidCnpj('12345')).toBeTruthy()
});

test('big cnpj', () => {
    expect(invalidCnpj('12345678901234567890')).toBeTruthy()
});

test('letter in cnpj', () => {
    expect(invalidCnpj('A1234567890123')).toBeTruthy()
});

test('valid cnpj', () => {
    expect(invalidCnpj('12345678912345')).toBeFalsy()
});
