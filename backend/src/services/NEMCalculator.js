class NEMCalculator {
    static calcular({
        especie,
        pesoAtual,
        condicao,
        detalhes = {}
    }) {
        
        const pc = Number(pesoAtual);

        if (!pc || pc <= 0) {
            throw new Error ('Peso atual inválido');
        }

        let nem;

        if (especie === 'cao'){
            const pc075 = Math.pow(pc, 0.75);

            switch (condicao) {

                case 'jovem_ativo':
                    nem = 140 * pc075;
                    break;

                case 'dogue_alemao':
                    nem = 200 * pc075;
                    break;

                case 'adulto_ativo':
                    nem = 130 * pc075;
                    break;

                case 'terrier':
                    nem = 180 * pc075;
                    break;

                case 'inativo':
                    nem = 95 * pc075;
                    break;

                case 'idoso':
                    nem = (detalhes.fator || 105) * pc075;
                    break;

                case 'filhote': {
                    const pesoAdultoEsperado =
                    Number(detalhes.pesoAdultoEsperado);

                    if (!pesoAdultoEsperado){
                        throw new Error(
                            'pesoAdultoEsperado é obrigatório para filhotes'
                        );
                    }

                    const p = pc/pesoAdultoEsperado;

                    nem = 
                        (130 * pc075) *
                        (
                            3.2 *
                            (
                                Math.exp(-0.87 * p) - 0.1
                            )
                        );

                        break;

                }

                case 'gestante':
                    nem = (130 * pc075) + (26 * pc);
                    break;

                case 'lactante': {
                    const semana = Number(detalhes.semana);

                    const n1a4 =
                        Number(detalhes.n1a4 || 0);

                    const n5a8 =
                        Number(detalhes.n5a8 || 0);

                    const fatoresSemana = {
                        1: 0.75,
                        2: 0.95,
                        3: 1.12,
                        4: 1.20
                    };
                    
                    const L = fatoresSemana[semana];

                    if(!L) {
                        throw new Error(
                            'Semana de lactação inválida'
                        );
                    }

                    nem =
                        (130 * pc075) +
                        (
                            pc *
                            (
                                (24 * n1a4) +
                                (12 * n5a8)
                            ) *
                            L
                        );

                        break;
                }

                default:
                    throw new Error(
                        'Condição inválida para cão '
                    );
            }
        }

        else if (especie === 'gato'){
            const pc067 = Math.pow(pc, 0.67);

            switch(condicao){
                
                case 'magro':
                    nem = 100 * pc067;
                    break;

                case 'obeso':
                    nem = 130 * Math.pow(pc, 0.4);
                    break;

                case 'adulto':
                    nem = 100 * pc067;
                    break;

                case 'idoso':
                    nem = 75 * pc067;
                    break;

                case 'filhote': {

                    const pesoAdultoEsperado = 
                        Number(detalhes.pesoAdultoEsperado);

                    if (!pesoAdultoEsperado){
                        throw new Error(
                            'pesoAdultoEsperado é obrigatório para filhotes'
                        );
                    }

                    const p = pc/pesoAdultoEsperado;

                    nem = 
                        (100 * pc067) *
                        (
                            6.7 *
                            (
                                Math.exp(-0.189 * p) - 0.66
                            )
                        );

                        break;
                }

                case 'gestante':
                    nem = 140 * pc067;
                    break;

                case 'lactante': {

                    const semana =
                        Number(detalhes.semana);

                    const numeroFilhotes = 
                        Number(detalhes.numeroFilhotes);

                    const fatoresSemana = {
                        1: 0.75,
                        2: 0.95,
                        3: 1.10,
                        4: 1.20
                    };

                    const L = fatoresSemana[semana];

                    if(!L){
                        throw new Error(
                            'Semana de lactação inválida'
                        );
                    }

                    let fator;

                    if (numeroFilhotes <= 2){
                        fator = 18;
                    }
                    else if (numeroFilhotes <= 4){
                        fator = 60;
                    }
                    else {
                        fator = 70;
                    }

                    nem = 
                        (100 * pc067) +
                        (
                            fator *
                            pc * 
                            L
                        );

                    break;
                }

                default:
                    throw new Error(
                        'Condição inválida para gato'
                    );
            }
        }

        else {
            throw new Error('Espécie inválida');
        }

        return {
            nem
        };
    }
}

module.exports = NEMCalculator;