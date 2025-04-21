// Calculadora de combustível e entregas
document.addEventListener('DOMContentLoaded', function() {
    // Elementos da calculadora de combustível
    const quilometragemInput = document.getElementById('quilometragem');
    const valorLitroInput = document.getElementById('valor-litro');
    const consumoInput = document.getElementById('consumo');
    const calcularCombustivelBtn = document.getElementById('calcularCombustivel');
    const resultadoCombustivel = document.getElementById('resultado-combustivel');
    
    // Elementos da calculadora de entregas
    const qtdPacotesInput = document.getElementById('qtd-pacotes');
    const qtdParadasInput = document.getElementById('qtd-paradas');
    const tempoEntregaSelect = document.getElementById('tempo-entrega');
    const calcularEntregasBtn = document.getElementById('calcularEntregas');
    const resultadoEntregas = document.getElementById('resultado-entregas');
    const resultadoEntregasHoras = document.getElementById('resultado-entregas-horas');
    
    // Adicionar eventos aos botões
    if (calcularCombustivelBtn) {
        calcularCombustivelBtn.addEventListener('click', calcularCombustivel);
    }
    
    if (calcularEntregasBtn) {
        calcularEntregasBtn.addEventListener('click', calcularEntregas);
    }
    
    // Função para calcular gasto de combustível
    function calcularCombustivel() {
        // Obter valores dos inputs
        const quilometragem = parseFloat(quilometragemInput.value) || 0;
        const valorLitro = parseFloat(valorLitroInput.value) || 0;
        const consumo = parseFloat(consumoInput.value) || 1; // Evitar divisão por zero
        
        // Calcular gasto
        const litrosNecessarios = quilometragem / consumo;
        const gastoTotal = litrosNecessarios * valorLitro;
        
        // Exibir resultado formatado
        resultadoCombustivel.textContent = gastoTotal.toFixed(2);
        
        // Adicionar classe de animação
        resultadoCombustivel.classList.add('highlight');
        setTimeout(() => {
            resultadoCombustivel.classList.remove('highlight');
        }, 1000);
    }
    
    // Função para calcular tempo de entregas
    function calcularEntregas() {
        // Obter valores dos inputs
        const qtdPacotes = parseInt(qtdPacotesInput.value) || 0;
        const qtdParadas = parseInt(qtdParadasInput.value) || 0;
        const tempoEntrega = parseInt(tempoEntregaSelect.value) || 3;
        
        // Calcular tempo total (usando o maior valor entre pacotes e paradas)
        const tempoTotal = Math.max(qtdPacotes, qtdParadas) * tempoEntrega;
        
        // Calcular horas e minutos
        const horas = Math.floor(tempoTotal / 60);
        const minutos = tempoTotal % 60;
        
        // Exibir resultados
        resultadoEntregas.textContent = tempoTotal;
        
        if (horas > 0) {
            resultadoEntregasHoras.textContent = `${horas} hora${horas !== 1 ? 's' : ''} e ${minutos} minuto${minutos !== 1 ? 's' : ''}`;
        } else {
            resultadoEntregasHoras.textContent = `${minutos} minuto${minutos !== 1 ? 's' : ''}`;
        }
        
        // Adicionar classe de animação
        resultadoEntregas.classList.add('highlight');
        resultadoEntregasHoras.classList.add('highlight');
        setTimeout(() => {
            resultadoEntregas.classList.remove('highlight');
            resultadoEntregasHoras.classList.remove('highlight');
        }, 1000);
    }
    
    // Adicionar estilo para animação de destaque
    const style = document.createElement('style');
    style.textContent = `
        .highlight {
            animation: highlight-pulse 1s ease;
        }
        
        @keyframes highlight-pulse {
            0% { color: #000; }
            50% { color: #FB641B; }
            100% { color: #000; }
        }
    `;
    document.head.appendChild(style);
});
