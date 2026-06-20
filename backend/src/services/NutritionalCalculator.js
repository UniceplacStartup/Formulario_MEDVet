const EMCalculator = require('./EMCalculator');
const NEMCalculator = require('./NEMCalculator');

class NutritionalCalculator {
    /**
     * Método orquestrador do fluxo do RF06
     * @param {Object} paciente Dados do paciente
     * @param {Object} formulario Dados do formulário
     * @param {Array} alimentos Lista de alimentos
     * @returns {Object} Resultado com totais e quantidade recomendada
     */
    static calcular(paciente, formulario, alimentos) {
        // Garante o tratamento para cenários de valores nulos
        if (!paciente || !formulario || !alimentos || !Array.isArray(alimentos)) {
            throw new Error('Dados insuficientes para realizar o cálculo');
        }

        // Normaliza IDs explicitamente (PostgreSQL retorna BIGINT como string)
        const pacienteId = Number(paciente.id);
        const formPacienteId = Number(formulario.paciente_id);

        // Validação estrita usando Number()
        if (!isNaN(pacienteId) && !isNaN(formPacienteId) && pacienteId !== formPacienteId) {
            throw new Error('Inconsistência: O formulário não pertence a este paciente');
        }

        let emTotal = 0;

        // Processa cada alimento
        const alimentosProcessados = alimentos.map(alimento => {
            const alimentoId = Number(alimento.id);

            // 1. Calcula ENN e 2. Calcula a EM (validando a espécie internamente)
            const { enn, em } = EMCalculator.calcular({
                especie: paciente.especie,
                tipo: alimento.tipo || 'seco',
                composicao: alimento
            });

            // 3. Soma a EM total de todos os alimentos
            emTotal += em;

            return {
                id: alimentoId,
                enn,
                em
            };
        });

        // 4. Detecta a condição atual do animal
        const condicao = this._detectarCondicao(paciente, formulario);

        // Garante peso válido
        const pesoAtual = Number(formulario.peso_atual || paciente.peso) || 0;

        // 5. Determina o NEM apropriado para a condição detectada
        const { nem } = NEMCalculator.calcular({
            especie: paciente.especie,
            pesoAtual,
            condicao,
            detalhes: formulario.detalhes || {}
        });

        // 6. Calcula a quantidade de ração diária recomendada
        let quantidadeRecomendada = 0;

        // Evita divisão por zero
        if (emTotal > 0) {
            // Fórmula: quantidadeRecomendada = (NEM / dia) / (EM por 100g) * 100
            quantidadeRecomendada = (nem / emTotal) * 100;
        }

        return {
            alimentos: alimentosProcessados,
            emTotal,
            condicao,
            nem,
            quantidadeRecomendada
        };
    }

    /**
     * Cruza dados do paciente e formulário para detectar a condição
     */
    static _detectarCondicao(paciente, formulario) {
        // Verifica se é gestante
        if (formulario.gestante === true || String(formulario.gestante) === 'true' || 
            paciente.gestante === true || String(paciente.gestante) === 'true') {
            return 'gestante';
        }
        
        // Verifica se é lactante
        if (formulario.lactante === true || String(formulario.lactante) === 'true' || 
            paciente.lactante === true || String(paciente.lactante) === 'true') {
            return 'lactante';
        }

        // Verifica fase de vida explícita
        const faseVidaForm = String(formulario.fase_vida || '').toLowerCase();
        const faseVidaPac = String(paciente.fase_vida || '').toLowerCase();
        
        if (faseVidaForm.includes('filhote') || faseVidaPac.includes('filhote')) {
            return 'filhote';
        }
        
        if (faseVidaForm.includes('idoso') || faseVidaPac.includes('idoso')) {
            return 'idoso';
        }

        // Padrão assumido se nenhuma condição específica for detectada
        return 'adulto';
    }
}

module.exports = NutritionalCalculator;
