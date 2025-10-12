const Clinic = require('../src/models/Clinic');
const {expect, test} = require('@jest/globals');

const { createToken, getSubjectFromToken } = require('../src/utils/jwt');

test('create token', () => {
    const clinic = new Clinic.Clinic('1', '2', '3', '4', '5');
    expect(createToken(clinic)).toContain('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.');
});
test('get subject from token', () => {
    const clinic = new Clinic.Clinic('1', '2', '3', '4', '5');
    const token = createToken(clinic);
    const subject = getSubjectFromToken(token); 
    expect(subject.cnpj).toBe('1');
});
