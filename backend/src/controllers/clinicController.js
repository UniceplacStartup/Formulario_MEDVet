// Lógica para o cadastro da clínica (RF01)
const createClinic = async (req, res) => {
  
  const { cnpj, razaoSocial, email, telefone, senha } = req.body;

  console.log('Dados recebidos:', req.body);

  res.status(201).json({ message: 'Clínica em processo de cadastro!' });
};

module.exports = {
  createClinic,
};
