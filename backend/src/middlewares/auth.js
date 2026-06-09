const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRETKEY;

const authenticateToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = {
            id: decoded.id,
            clinicaId: decoded.clinicaId,
            role: decoded.role,
            email: decoded.email
        };
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Token inválido ou expirado.' });
    }
};

module.exports = { authenticateToken };
