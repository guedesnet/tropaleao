// Script de teste e otimização do site
document.addEventListener('DOMContentLoaded', function() {
    console.log('Iniciando testes de funcionalidades e otimização...');
    
    // Verificar se todos os scripts foram carregados
    const requiredScripts = [
        'script.js',
        'cep.js',
        'calculadoras.js',
        'rota.js',
        'chat.js',
        'pnr.js',
        'pdf-generator.js',
        'api-viacep.js',
        'api-google-maps.js',
        'api-chatgpt.js',
        'external-links.js'
    ];
    
    const loadedScripts = Array.from(document.scripts)
        .map(script => {
            const src = script.src;
            if (!src) return null;
            const parts = src.split('/');
            return parts[parts.length - 1];
        })
        .filter(Boolean);
    
    console.log('Scripts carregados:', loadedScripts);
    
    // Verificar se todos os elementos principais existem
    const requiredElements = [
        { id: 'cep', name: 'Input de CEP' },
        { id: 'buscarCep', name: 'Botão de busca de CEP' },
        { id: 'map', name: 'Container do mapa' },
        { id: 'quilometragem', name: 'Input de quilometragem' },
        { id: 'valor-litro', name: 'Input de valor do litro' },
        { id: 'consumo', name: 'Input de consumo' },
        { id: 'calcularCombustivel', name: 'Botão de calcular combustível' },
        { id: 'qtd-pacotes', name: 'Input de quantidade de pacotes' },
        { id: 'calcularEntregas', name: 'Botão de calcular entregas' },
        { id: 'dados-rota', name: 'Textarea de dados de rota' },
        { id: 'otimizarRota', name: 'Botão de otimizar rota' },
        { id: 'gerarPDF', name: 'Botão de gerar PDF' },
        { id: 'chat-messages', name: 'Container de mensagens do chat' },
        { id: 'user-input', name: 'Input de mensagem do usuário' },
        { id: 'send-message', name: 'Botão de enviar mensagem' },
        { id: 'nome-cliente', name: 'Input de nome do cliente' },
        { id: 'nome-motorista', name: 'Input de nome do motorista' },
        { id: 'codigo-pedido', name: 'Input de código do pedido' },
        { id: 'gerarMensagemPNR', name: 'Botão de gerar mensagem PNR' }
    ];
    
    const missingElements = [];
    
    requiredElements.forEach(element => {
        if (!document.getElementById(element.id)) {
            missingElements.push(element.name);
            console.error(`Elemento não encontrado: ${element.name} (ID: ${element.id})`);
        }
    });
    
    if (missingElements.length > 0) {
        console.error('Elementos faltando:', missingElements);
    } else {
        console.log('Todos os elementos principais foram encontrados');
    }
    
    // Verificar responsividade
    const checkResponsiveness = () => {
        const viewportWidth = window.innerWidth;
        console.log('Largura atual do viewport:', viewportWidth);
        
        if (viewportWidth < 768) {
            console.log('Testando layout mobile');
            // Verificar se o menu mobile está funcionando
            const menuToggle = document.getElementById('menuToggle');
            const menu = document.getElementById('menu');
            
            if (menuToggle && menu) {
                console.log('Menu mobile encontrado');
                
                // Verificar se o menu está inicialmente oculto
                const menuDisplay = window.getComputedStyle(menu).getPropertyValue('transform');
                if (menuDisplay.includes('matrix') && menuDisplay.includes('-150')) {
                    console.log('Menu mobile inicialmente oculto: OK');
                } else {
                    console.warn('Menu mobile pode não estar oculto inicialmente');
                }
            } else {
                console.error('Menu mobile não encontrado');
            }
        } else {
            console.log('Testando layout desktop');
            // Verificar se o menu está visível
            const menu = document.getElementById('menu');
            
            if (menu) {
                const menuDisplay = window.getComputedStyle(menu).display;
                if (menuDisplay !== 'none') {
                    console.log('Menu desktop visível: OK');
                } else {
                    console.warn('Menu desktop pode estar oculto');
                }
            }
        }
    };
    
    // Executar verificação de responsividade
    checkResponsiveness();
    
    // Otimizar carregamento de imagens
    const optimizeImages = () => {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Adicionar atributo loading="lazy" para carregamento preguiçoso
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
                console.log('Otimizado: Adicionado loading lazy para', img.src || img.alt);
            }
            
            // Garantir que todas as imagens tenham alt text para acessibilidade
            if (!img.hasAttribute('alt') || img.getAttribute('alt') === '') {
                const imgSrc = img.src || '';
                const parts = imgSrc.split('/');
                const fileName = parts[parts.length - 1].split('.')[0] || 'imagem';
                img.setAttribute('alt', fileName);
                console.log('Otimizado: Adicionado alt text para', imgSrc);
            }
        });
        
        console.log(`Otimizadas ${images.length} imagens`);
    };
    
    // Executar otimização de imagens
    optimizeImages();
    
    // Verificar performance
    const checkPerformance = () => {
        console.log('Verificando performance...');
        
        // Verificar tempo de carregamento
        const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
        console.log(`Tempo de carregamento: ${loadTime}ms`);
        
        // Verificar número de recursos carregados
        const resources = performance.getEntriesByType('resource');
        console.log(`Número de recursos carregados: ${resources.length}`);
        
        // Verificar tamanho total dos recursos
        let totalSize = 0;
        resources.forEach(resource => {
            totalSize += resource.transferSize || 0;
        });
        console.log(`Tamanho total dos recursos: ${(totalSize / 1024).toFixed(2)}KB`);
        
        // Sugestões de otimização
        if (loadTime > 3000) {
            console.warn('Tempo de carregamento alto. Considere otimizar recursos.');
        }
        
        if (resources.length > 30) {
            console.warn('Muitos recursos carregados. Considere combinar arquivos JS/CSS.');
        }
        
        if (totalSize > 2 * 1024 * 1024) {
            console.warn('Tamanho total dos recursos muito grande. Considere otimizar imagens e minificar JS/CSS.');
        }
    };
    
    // Executar verificação de performance após carregamento completo
    window.addEventListener('load', checkPerformance);
    
    // Adicionar testes de funcionalidade
    const testFunctionality = () => {
        console.log('Iniciando testes de funcionalidade...');
        
        // Testar busca de CEP
        const testCEP = () => {
            const cepInput = document.getElementById('cep');
            const buscarCepBtn = document.getElementById('buscarCep');
            
            if (cepInput && buscarCepBtn) {
                console.log('Teste: Busca de CEP');
                // Simular entrada de CEP
                cepInput.value = '20031-170';
                // Simular clique no botão
                buscarCepBtn.click();
                console.log('Teste de busca de CEP iniciado');
            }
        };
        
        // Testar calculadora de combustível
        const testCalculadoraCombustivel = () => {
            const quilometragemInput = document.getElementById('quilometragem');
            const valorLitroInput = document.getElementById('valor-litro');
            const consumoInput = document.getElementById('consumo');
            const calcularCombustivelBtn = document.getElementById('calcularCombustivel');
            
            if (quilometragemInput && valorLitroInput && consumoInput && calcularCombustivelBtn) {
                console.log('Teste: Calculadora de Combustível');
                // Simular entrada de dados
                quilometragemInput.value = '100';
                valorLitroInput.value = '5.50';
                consumoInput.value = '10';
                // Simular clique no botão
                calcularCombustivelBtn.click();
                console.log('Teste de calculadora de combustível iniciado');
            }
        };
        
        // Testar calculadora de entregas
        const testCalculadoraEntregas = () => {
            const qtdPacotesInput = document.getElementById('qtd-pacotes');
            const calcularEntregasBtn = document.getElementById('calcularEntregas');
            
            if (qtdPacotesInput && calcularEntregasBtn) {
                console.log('Teste: Calculadora de Entregas');
                // Simular entrada de dados
                qtdPacotesInput.value = '20';
                // Simular clique no botão
                calcularEntregasBtn.click();
                console.log('Teste de calculadora de entregas iniciado');
            }
        };
        
        // Executar testes com intervalo para não sobrecarregar
        setTimeout(testCEP, 1000);
        setTimeout(testCalculadoraCombustivel, 3000);
        setTimeout(testCalculadoraEntregas, 5000);
    };
    
    // Executar testes de funcionalidade após carregamento completo
    window.addEventListener('load', function() {
        setTimeout(testFunctionality, 2000);
    });
    
    console.log('Testes e otimização concluídos');
});
