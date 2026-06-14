const checkRole = (...rolesPermitidos) => {
    return (req, res, next) => {
        // Verifica se o usuário tem um dos papéis permitidos
        if (!req.user || !rolesPermitidos.includes(req.user.role)) {
            // Retorna 403 se o papel não for permitido
            return res.status(403).json({ error: 'Acesso negado. Permissão insuficiente.' });
        }
        next();
    };
};

module.exports = { checkRole };
