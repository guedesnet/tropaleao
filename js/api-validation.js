// Validação de integração com APIs
document.addEventListener('DOMContentLoaded', function() {
    console.log('Iniciando validação de integração com APIs...');
    
    // Validar integração com ViaCEP
    function validarViaCEP() {
        console.log('Validando integração com ViaCEP...');
        
        // Testar com um CEP válido conhecido
        fetch('https://viacep.com.br/ws/20031170/json/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na requisição à API ViaCEP');
                }
                return response.json();
            })
            .then(data => {
                if (data.erro) {
                    console.error('API ViaCEP retornou erro para CEP de teste');
                } else {
                    console.log('Integração com ViaCEP validada com sucesso:', data);
                }
            })
            .catch(error => {
                console.error('Falha na validação da API ViaCEP:', error);
            });
    }
    
    // Validar integração com Google Maps
    function validarGoogleMaps() {
        console.log('Validando integração com Google Maps...');
        
        // Verificar se a API do Google Maps foi carregada
        if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
            console.error('API do Google Maps não carregada');
            return;
        }
        
        // Verificar se o mapa foi inicializado
        const mapDiv = document.getElementById('map');
        if (!mapDiv) {
            console.error('Elemento do mapa não encontrado');
            return;
        }
        
        // Verificar se o objeto do mapa existe
        if (typeof window.map === 'undefined' || !window.map) {
            console.error('Objeto do mapa não inicializado');
            return;
        }
        
        console.log('Integração com Google Maps validada com sucesso');
    }
    
    // Validar integração com ChatGPT (simulada)
    function validarChatGPT() {
        console.log('Validando integração com ChatGPT...');
        
        // Verificar se os elementos do chat existem
        const chatMessages = document.getElementById('chat-messages');
        const userInput = document.getElementById('user-input');
        const sendMessageBtn = document.getElementById('send-message');
        
        if (!chatMessages || !userInput || !sendMessageBtn) {
            console.error('Elementos do chat não encontrados');
            return;
        }
        
        // Verificar se há pelo menos uma mensagem inicial do bot
        const botMessages = chatMessages.querySelectorAll('.message.bot');
        if (botMessages.length === 0) {
            console.error('Mensagem inicial do bot não encontrada');
            return;
        }
        
        console.log('Integração com ChatGPT validada com sucesso');
    }
    
    // Validar links externos
    function validarLinksExternos() {
        console.log('Validando links externos...');
        
        const links = {
            'disponibilidade': 'https://docs.google.com/forms/d/1PqeA3JWDK2D3nhH7NS8jReocrTxlXl60gWTh0eeZLwU/edit',
            'nota-fiscal': 'https://www.nfse.gov.br/EmissorNacional/Login?ReturnUrl=%2fEmissorNacional',
            'whatsapp-suporte': 'https://wa.me/5521981072410'
        };
        
        // Verificar links de disponibilidade
        const disponibilidadeLinks = document.querySelectorAll('a[href*="docs.google.com"]');
        if (disponibilidadeLinks.length === 0) {
            console.error('Link para formulário de disponibilidade não encontrado');
        } else {
            console.log('Link para formulário de disponibilidade validado');
        }
        
        // Verificar links de nota fiscal
        const notaFiscalLinks = document.querySelectorAll('a[href*="nfse.gov.br"]');
        if (notaFiscalLinks.length === 0) {
            console.error('Link para nota fiscal não encontrado');
        } else {
            console.log('Link para nota fiscal validado');
        }
        
        // Verificar links de WhatsApp
        const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
        if (whatsappLinks.length === 0) {
            console.error('Link para WhatsApp não encontrado');
        } else {
            console.log('Links para WhatsApp validados');
        }
        
        console.log('Validação de links externos concluída');
    }
    
    // Executar validações após carregamento completo
    window.addEventListener('load', function() {
        // Executar validações com intervalos para não sobrecarregar
        setTimeout(validarViaCEP, 1000);
        setTimeout(validarGoogleMaps, 2000);
        setTimeout(validarChatGPT, 3000);
        setTimeout(validarLinksExternos, 4000);
    });
    
    console.log('Processo de validação de APIs iniciado');
});
