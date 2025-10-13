const {expect, test} = require('@jest/globals');

const { encryptPassword, comparePassword } = require('../src/utils/bcrypt');

test('should salt password', async () => {
    expect(await encryptPassword('1234')).not.toEqual(await encryptPassword('1234'));
});
test('compare passwords', async () => {
    const password = '1234';
    const encryptedPassword = await encryptPassword(password);
    expect(comparePassword(password,encryptedPassword)).toBeTruthy;
});
