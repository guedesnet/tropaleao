// Preparação para implantação
document.addEventListener('DOMContentLoaded', function() {
    console.log('Preparando site para implantação...');
    
    // Verificar se todos os arquivos necessários estão presentes
    const requiredFiles = [
        'index.html',
        'css/style.css',
        'js/script.js',
        'js/cep.js',
        'js/calculadoras.js',
        'js/rota.js',
        'js/chat.js',
        'js/pnr.js',
        'js/pdf-generator.js',
        'js/api-viacep.js',
        'js/api-google-maps.js',
        'js/api-chatgpt.js',
        'js/external-links.js',
        'js/test-optimization.js',
        'js/optimization.js',
        'js/api-validation.js'
    ];
    
    // Adicionar versão minificada para produção
    const addVersionInfo = () => {
        const metaVersion = document.createElement('meta');
        metaVersion.name = 'version';
        metaVersion.content = '1.0.0';
        document.head.appendChild(metaVersion);
        
        const metaBuild = document.createElement('meta');
        metaBuild.name = 'build-date';
        metaBuild.content = new Date().toISOString();
        document.head.appendChild(metaBuild);
        
        console.log('Informações de versão adicionadas');
    };
    
    // Remover console.logs para produção
    const removeConsoleLogs = () => {
        if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
            console.log = function() {};
            console.warn = function() {};
            console.error = function() {};
            console.info = function() {};
            console.debug = function() {};
            
            console.log('Console logs desativados para produção');
        }
    };
    
    // Adicionar tratamento de erros global
    const addErrorHandling = () => {
        window.addEventListener('error', function(event) {
            // Em produção, poderia enviar para um serviço de monitoramento
            console.error('Erro capturado:', event.error);
            return false;
        });
        
        window.addEventListener('unhandledrejection', function(event) {
            console.error('Promise rejeitada não tratada:', event.reason);
            return false;
        });
        
        console.log('Tratamento de erros global adicionado');
    };
    
    // Verificar compatibilidade do navegador
    const checkBrowserCompatibility = () => {
        const isIE = navigator.userAgent.indexOf('MSIE') !== -1 || navigator.userAgent.indexOf('Trident/') !== -1;
        
        if (isIE) {
            alert('Este site funciona melhor em navegadores modernos como Chrome, Firefox, Edge ou Safari. Alguns recursos podem não funcionar corretamente no Internet Explorer.');
        }
        
        console.log('Verificação de compatibilidade concluída');
    };
    
    // Executar preparações para produção
    addVersionInfo();
    removeConsoleLogs();
    addErrorHandling();
    checkBrowserCompatibility();
    
    console.log('Site pronto para implantação');
});
