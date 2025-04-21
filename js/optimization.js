// Otimização de desempenho e correções finais
document.addEventListener('DOMContentLoaded', function() {
    console.log('Iniciando otimizações finais...');
    
    // Otimizar carregamento de scripts
    function otimizarScripts() {
        // Adicionar atributo defer aos scripts não críticos
        const scripts = document.querySelectorAll('script:not([defer]):not([async])');
        scripts.forEach(script => {
            if (!script.src.includes('google') && !script.src.includes('maps')) {
                script.defer = true;
                console.log('Script otimizado com defer:', script.src);
            }
        });
    }
    
    // Melhorar acessibilidade
    function melhorarAcessibilidade() {
        // Adicionar atributos ARIA para melhorar acessibilidade
        const botoes = document.querySelectorAll('button');
        botoes.forEach(botao => {
            if (!botao.hasAttribute('aria-label')) {
                botao.setAttribute('aria-label', botao.textContent.trim());
            }
        });
        
        // Garantir que todos os inputs tenham labels associados
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            if (!input.id) return;
            
            const label = document.querySelector(`label[for="${input.id}"]`);
            if (!label) {
                console.warn(`Input sem label: ${input.id}`);
            }
        });
    }
    
    // Otimizar formulários
    function otimizarFormularios() {
        // Adicionar autocomplete apropriado
        const nomeInputs = document.querySelectorAll('input[id*="nome"]');
        nomeInputs.forEach(input => {
            input.setAttribute('autocomplete', 'name');
        });
        
        // Adicionar validação de formulário
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                // Validação seria implementada aqui
                console.log('Formulário enviado:', form.id);
            });
        });
    }
    
    // Melhorar feedback visual
    function melhorarFeedback() {
        // Adicionar efeitos de hover em botões
        const botoes = document.querySelectorAll('.btn');
        botoes.forEach(botao => {
            botao.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.1)';
            });
            
            botao.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
            });
        });
        
        // Adicionar feedback de carregamento
        const acoes = document.querySelectorAll('.btn:not([disabled])');
        acoes.forEach(botao => {
            const textoOriginal = botao.textContent;
            
            botao.addEventListener('click', function() {
                // Não aplicar aos botões que já têm seus próprios handlers
                if (botao.id === 'buscarCep' || 
                    botao.id === 'calcularCombustivel' || 
                    botao.id === 'calcularEntregas' ||
                    botao.id === 'otimizarRota' ||
                    botao.id === 'gerarPDF' ||
                    botao.id === 'send-message' ||
                    botao.id === 'gerarMensagemPNR') {
                    return;
                }
                
                this.textContent = 'Processando...';
                
                setTimeout(() => {
                    this.textContent = textoOriginal;
                }, 1000);
            });
        });
    }
    
    // Otimizar para dispositivos móveis
    function otimizarMobile() {
        // Ajustar tamanho de fonte para inputs em dispositivos móveis
        if (window.innerWidth < 768) {
            const inputs = document.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.style.fontSize = '16px'; // Evita zoom automático em iOS
            });
        }
        
        // Melhorar experiência de toque
        const elementosClicaveis = document.querySelectorAll('button, a, .card');
        elementosClicaveis.forEach(elemento => {
            elemento.style.touchAction = 'manipulation';
        });
    }
    
    // Executar otimizações
    otimizarScripts();
    melhorarAcessibilidade();
    otimizarFormularios();
    melhorarFeedback();
    otimizarMobile();
    
    console.log('Otimizações finais concluídas');
});
