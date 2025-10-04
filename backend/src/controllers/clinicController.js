// Lógica para o cadastro da clínica (RF01)
const createClinic = async (req, res) => {
  // A validação dos dados (CNPJ, email, etc.) deve ser feita aqui
  const { cnpj, razaoSocial, email, telefone, senha } = req.body;

  console.log('Dados recebidos:', req.body);

  // TODO:
  // 1. Validar os dados de entrada.
  // 2. Hashear a senha antes de salvar.
  // 3. Chamar o model para inserir os dados no banco.
  // 4. Retornar a resposta apropriada.

  res.status(201).json({ message: 'Clínica em processo de cadastro!' });
};

module.exports = {
  createClinic,
};