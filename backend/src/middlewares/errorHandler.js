const errorHandler = (err, req, res, next) => {
  // Erro de validacao
  if (err.name === 'SequelizeValidationError') {
    const messages = err.errors.map(e => e.message);
    return res.status(400).json({ error: 'Erro de validação', messages });
  }

  // Violacao de chave unica
  if (err.name === 'SequelizeUniqueConstraintError') {
    const messages = err.errors.map(e => e.message);
    return res.status(409).json({ error: 'Conflito de dados', messages });
  }

  // Token invalido
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }

  // Erro generico
  const isProduction = process.env.NODE_ENV === 'production';
  return res.status(500).json({
    error: 'Erro interno no servidor',
    message: isProduction ? 'Ocorreu um erro inesperado.' : err.message,
    stack: isProduction ? undefined : err.stack
  });
};

module.exports = errorHandler;
