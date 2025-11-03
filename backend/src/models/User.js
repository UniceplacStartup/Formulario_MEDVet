const db = require('../config/database');

class User {
    id;
    clinic_id;
    nome;
    email;
    password;
    role;
    created_at; 
    updated_at; 

    constructor(clinic_id, nome, email, role, password) {
        this.clinic_id = clinic_id;
        this.nome = nome;
        this.email = email;
        this.role = role;
        this.password = password;
    }

    async save() {
        await db.query('INSERT INTO usuarios(clinica_id, nome, email, password_hash, role) VALUES($1, $2, $3, $4, $5)', [this.clinic_id, this.nome, this.email, this.password, this.role]); 
    }

    async findByEmail(email) {
        const result = await db.query('SELECT * FROM usuarios WHERE email=$1', [email]);
        const user = result.rows.pop();
        this.id = user.id;
        this.clinic_id = user.clinica_id;
        this.nome = user.nome;
        this.email = user.email;
        this.password = user.password_hash;
        this.role = user.role;
        this.created_at = user.created_at;
        this.updated_at = user.updated_at;
    }
}

module.exports = { User };
