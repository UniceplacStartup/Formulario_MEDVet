class Clinic {
    cnpj;
    razaoSocial;
    email; 
    telefone; 
    senha;

    constructor(cnpj, razaoSocial, email, telefone, senha) {
        this.cnpj = cnpj;
        this.razaoSocial = razaoSocial;
        this.email = email;
        this.telefone = telefone;
        this.senha = senha;
    }
}

module.exports = { Clinic };
