const User = require('../models/User');

const { createToken } = require('../utils/jwt');
const { encryptPassword, comparePassword } = require('../utils/bcrypt');
const { isUndefined, invalidPassword, invalidEmail } = require('../utils/validateInput');

const register = async (req, res) => {
    try {
        const { nome, email, password, role } = req.body;

        const clinic_id = req.user.clinicaId;

        const rolesPermitidas = [
            'admin',
            'veterinario',
            'atendente'
        ];

        if (!role || !rolesPermitidas.includes(role.trim())){
            return res.status(400).json({
                error: 'Role inválida'
            });
        }

        if (isUndefined(clinic_id) || isUndefined(nome) || invalidEmail(email) || isUndefined(role) || invalidPassword(password)) {
            res.status(400).json({ error: 'Dados inválidos' });
            return
        }

        const user = new User.User(
            Number(clinic_id), 
            nome.trim(), 
            email.trim(), 
            role.trim(), 
            await encryptPassword(password.trim())
        );

        await user.save();

        const token = createToken(user);

        res.status(201).json({ token: token });
    } catch (err) {
        console.error('Erro ao registrar usuário:', err);
        res.status(500).json({ error: 'Erro ao registrar usuário', details: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (invalidEmail(email) || invalidPassword(password)) {
            res.status(400).json({ error: 'Email ou senha inválidos' });
            return
        }

        const user = new User.User();
        await user.findByEmail(email)

        if (!await comparePassword(password, user.password)) {
            res.status(401).json({ error: 'Credenciais inválidas' });
            return
        }

        const token = createToken(user);

        res.status(200).json({ token: token });
    } catch (err) {
        console.error('Erro ao fazer login:', err);
        res.status(500).json({ error: 'Erro ao fazer login', details: err.message });
    }
};

module.exports = {
    register,
    login,
};
