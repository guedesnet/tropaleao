// Implementação das instruções de instalação como PWA (Progressive Web App)
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se o site já está instalado como PWA
    const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || 
                              window.navigator.standalone || 
                              document.referrer.includes('android-app://');
    
    // Criar o componente de instruções PWA
    function criarComponentePWA() {
        const pwaContainer = document.createElement('div');
        pwaContainer.id = 'pwa-instructions';
        pwaContainer.className = 'pwa-instructions';
        
        pwaContainer.innerHTML = `
            <div class="pwa-header">
                <h3><i class="fas fa-mobile-alt"></i> Instale o SUPORTE DOS CRIA no seu celular</h3>
                <button class="pwa-close" aria-label="Fechar">&times;</button>
            </div>
            <div class="pwa-content">
                <p>Transforme este site em um aplicativo para acesso rápido e offline:</p>
                
                <div class="pwa-tabs">
                    <button class="pwa-tab-btn active" data-target="android">Android</button>
                    <button class="pwa-tab-btn" data-target="iphone">iPhone</button>
                </div>
                
                <div class="pwa-tab-content active" id="android-instructions">
                    <div class="pwa-steps">
                        <div class="pwa-step">
                            <div class="pwa-step-number">1</div>
                            <div class="pwa-step-content">
                                <p>Toque no menu <strong>⋮</strong> (três pontos) no canto superior direito do Chrome</p>
                                <div class="pwa-step-image android-step1"></div>
                            </div>
                        </div>
                        <div class="pwa-step">
                            <div class="pwa-step-number">2</div>
                            <div class="pwa-step-content">
                                <p>Selecione <strong>Adicionar à tela inicial</strong> ou <strong>Instalar aplicativo</strong></p>
                                <div class="pwa-step-image android-step2"></div>
                            </div>
                        </div>
                        <div class="pwa-step">
                            <div class="pwa-step-number">3</div>
                            <div class="pwa-step-content">
                                <p>Toque em <strong>Adicionar</strong> ou <strong>Instalar</strong> para confirmar</p>
                                <div class="pwa-step-image android-step3"></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="pwa-tab-content" id="iphone-instructions">
                    <div class="pwa-steps">
                        <div class="pwa-step">
                            <div class="pwa-step-number">1</div>
                            <div class="pwa-step-content">
                                <p>Toque no ícone de compartilhamento <strong>↑</strong> na barra inferior do Safari</p>
                                <div class="pwa-step-image iphone-step1"></div>
                            </div>
                        </div>
                        <div class="pwa-step">
                            <div class="pwa-step-number">2</div>
                            <div class="pwa-step-content">
                                <p>Role para baixo e toque em <strong>Adicionar à Tela de Início</strong></p>
                                <div class="pwa-step-image iphone-step2"></div>
                            </div>
                        </div>
                        <div class="pwa-step">
                            <div class="pwa-step-number">3</div>
                            <div class="pwa-step-content">
                                <p>Toque em <strong>Adicionar</strong> no canto superior direito</p>
                                <div class="pwa-step-image iphone-step3"></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="pwa-benefits">
                    <div class="pwa-benefit">
                        <i class="fas fa-bolt"></i>
                        <span>Acesso rápido</span>
                    </div>
                    <div class="pwa-benefit">
                        <i class="fas fa-wifi-slash"></i>
                        <span>Funciona offline</span>
                    </div>
                    <div class="pwa-benefit">
                        <i class="fas fa-mobile-alt"></i>
                        <span>Ícone na tela</span>
                    </div>
                </div>
                
                <button class="pwa-dismiss">Entendi, mostrar depois</button>
            </div>
        `;
        
        // Adicionar ao corpo do documento
        document.body.appendChild(pwaContainer);
        
        // Adicionar eventos
        const closeBtn = pwaContainer.querySelector('.pwa-close');
        const dismissBtn = pwaContainer.querySelector('.pwa-dismiss');
        const tabBtns = pwaContainer.querySelectorAll('.pwa-tab-btn');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                pwaContainer.style.display = 'none';
                // Salvar preferência por 1 dia
                localStorage.setItem('pwa_dismissed', Date.now());
            });
        }
        
        if (dismissBtn) {
            dismissBtn.addEventListener('click', function() {
                pwaContainer.style.display = 'none';
                // Salvar preferência por 1 dia
                localStorage.setItem('pwa_dismissed', Date.now());
            });
        }
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remover classe active de todos os botões
                tabBtns.forEach(b => b.classList.remove('active'));
                // Adicionar classe active ao botão clicado
                this.classList.add('active');
                
                // Esconder todos os conteúdos
                const tabContents = pwaContainer.querySelectorAll('.pwa-tab-content');
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Mostrar o conteúdo correspondente
                const targetId = this.getAttribute('data-target') + '-instructions';
                const targetContent = document.getElementById(targetId);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
        
        return pwaContainer;
    }
    
    // Adicionar estilos para o componente PWA
    function adicionarEstilosPWA() {
        const style = document.createElement('style');
        style.textContent = `
            .pwa-instructions {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 350px;
                background-color: white;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                z-index: 1000;
                overflow: hidden;
                font-family: Arial, sans-serif;
                transition: all 0.3s ease;
                border: 1px solid #ddd;
            }
            
            @media (max-width: 480px) {
                .pwa-instructions {
                    width: calc(100% - 40px);
                    bottom: 10px;
                    right: 10px;
                    left: 10px;
                }
            }
            
            .pwa-header {
                background-color: #FB641B;
                color: white;
                padding: 15px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .pwa-header h3 {
                margin: 0;
                font-size: 18px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .pwa-close {
                background: none;
                border: none;
                color: white;
                font-size: 24px;
                cursor: pointer;
                padding: 0;
                line-height: 1;
            }
            
            .pwa-content {
                padding: 15px;
            }
            
            .pwa-tabs {
                display: flex;
                border-bottom: 1px solid #ddd;
                margin-bottom: 15px;
            }
            
            .pwa-tab-btn {
                flex: 1;
                background: none;
                border: none;
                padding: 10px;
                cursor: pointer;
                font-weight: bold;
                color: #666;
                position: relative;
            }
            
            .pwa-tab-btn.active {
                color: #FB641B;
            }
            
            .pwa-tab-btn.active:after {
                content: '';
                position: absolute;
                bottom: -1px;
                left: 0;
                width: 100%;
                height: 3px;
                background-color: #FB641B;
            }
            
            .pwa-tab-content {
                display: none;
            }
            
            .pwa-tab-content.active {
                display: block;
            }
            
            .pwa-steps {
                margin-bottom: 15px;
            }
            
            .pwa-step {
                display: flex;
                margin-bottom: 15px;
                align-items: flex-start;
            }
            
            .pwa-step-number {
                width: 30px;
                height: 30px;
                background-color: #FB641B;
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                margin-right: 10px;
                flex-shrink: 0;
            }
            
            .pwa-step-content {
                flex: 1;
            }
            
            .pwa-step-content p {
                margin-top: 0;
                margin-bottom: 5px;
            }
            
            .pwa-step-image {
                height: 100px;
                background-color: #f5f5f5;
                border-radius: 5px;
                margin-top: 5px;
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
            }
            
            /* Placeholder para imagens de exemplo */
            .android-step1 {
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="100" viewBox="0 0 200 100"><rect width="200" height="100" fill="%23f5f5f5"/><text x="100" y="50" font-family="Arial" font-size="14" text-anchor="middle" fill="%23666">Menu de três pontos</text></svg>');
            }
            
            .android-step2 {
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="100" viewBox="0 0 200 100"><rect width="200" height="100" fill="%23f5f5f5"/><text x="100" y="50" font-family="Arial" font-size="14" text-anchor="middle" fill="%23666">Adicionar à tela inicial</text></svg>');
            }
            
            .android-step3 {
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="100" viewBox="0 0 200 100"><rect width="200" height="100" fill="%23f5f5f5"/><text x="100" y="50" font-family="Arial" font-size="14" text-anchor="middle" fill="%23666">Botão Adicionar</text></svg>');
            }
            
            .iphone-step1 {
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="100" viewBox="0 0 200 100"><rect width="200" height="100" fill="%23f5f5f5"/><text x="100" y="50" font-family="Arial" font-size="14" text-anchor="middle" fill="%23666">Botão de compartilhamento</text></svg>');
            }
            
            .iphone-step2 {
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="100" viewBox="0 0 200 100"><rect width="200" height="100" fill="%23f5f5f5"/><text x="100" y="50" font-family="Arial" font-size="14" text-anchor="middle" fill="%23666">Adicionar à Tela de Início</text></svg>');
            }
            
            .iphone-step3 {
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="100" viewBox="0 0 200 100"><rect width="200" height="100" fill="%23f5f5f5"/><text x="100" y="50" font-family="Arial" font-size="14" text-anchor="middle" fill="%23666">Botão Adicionar</text></svg>');
            }
            
            .pwa-benefits {
                display: flex;
                justify-content: space-around;
                margin: 15px 0;
                text-align: center;
            }
            
            .pwa-benefit {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 5px;
            }
            
            .pwa-benefit i {
                font-size: 24px;
                color: #FB641B;
            }
            
            .pwa-dismiss {
                width: 100%;
                padding: 10px;
                background-color: #f5f5f5;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                margin-top: 10px;
                font-weight: bold;
                color: #666;
            }
            
            .pwa-dismiss:hover {
                background-color: #e5e5e5;
            }
            
            /* Animação de entrada */
            @keyframes slideIn {
                from {
                    transform: translateY(100%);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            
            .pwa-instructions {
                animation: slideIn 0.5s ease forwards;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Adicionar link para o menu
    function adicionarLinkMenu() {
        const menu = document.querySelector('nav ul, .navbar-nav, .menu, #menu');
        if (!menu) return;
        
        const menuItem = document.createElement('li');
        menuItem.className = 'nav-item pwa-menu-item';
        
        const link = document.createElement('a');
        link.href = '#';
        link.className = 'nav-link';
        link.innerHTML = '<i class="fas fa-mobile-alt"></i> Instalar App';
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Mostrar instruções PWA
            const pwaInstructions = document.getElementById('pwa-instructions');
            if (pwaInstructions) {
                pwaInstructions.style.display = 'block';
            } else {
                const newInstructions = criarComponentePWA();
                newInstructions.style.display = 'block';
            }
        });
        
        menuItem.appendChild(link);
        menu.appendChild(menuItem);
    }
    
    // Adicionar seção no footer
    function adicionarSecaoFooter() {
        const footer = document.querySelector('footer');
        if (!footer) return;
        
        const pwaSection = document.createElement('div');
        pwaSection.className = 'pwa-footer-section';
        
        pwaSection.innerHTML = `
            <h4>Instale como Aplicativo</h4>
            <p>Adicione o SUPORTE DOS CRIA à tela inicial do seu celular para acesso rápido e offline.</p>
            <button class="btn btn-outline-light pwa-footer-btn">
                <i class="fas fa-mobile-alt"></i> Ver Instruções
            </button>
        `;
        
        const pwaBtn = pwaSection.querySelector('.pwa-footer-btn');
        if (pwaBtn) {
            pwaBtn.addEventListener('click', function() {
                // Mostrar instruções PWA
                const pwaInstructions = document.getElementById('pwa-instructions');
                if (pwaInstructions) {
                    pwaInstructions.style.display = 'block';
                } else {
                    const newInstructions = criarComponentePWA();
                    newInstructions.style.display = 'block';
                }
            });
        }
        
        footer.appendChild(pwaSection);
        
        // Adicionar estilos
        const style = document.createElement('style');
        style.textContent = `
            .pwa-footer-section {
                margin-top: 20px;
                padding-top: 20px;
                border-top: 1px solid rgba(255,255,255,0.1);
            }
            
            .pwa-footer-btn {
                margin-top: 10px;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Verificar se deve mostrar as instruções
    function verificarExibicao() {
        // Não mostrar se já estiver em modo standalone (já instalado)
        if (isInStandaloneMode) return;
        
        // Verificar se foi dispensado recentemente
        const dismissed = localStorage.getItem('pwa_dismissed');
        if (dismissed) {
            const dismissedTime = parseInt(dismissed);
            const now = Date.now();
            const oneDayMs = 24 * 60 * 60 * 1000;
            
            // Se foi dispensado há menos de um dia, não mostrar
            if (now - dismissedTime < oneDayMs) return;
        }
        
        // Mostrar após 5 segundos na página
        setTimeout(() => {
            const pwaInstructions = document.getElementById('pwa-instructions');
            if (pwaInstructions) {
                pwaInstructions.style.display = 'block';
            } else {
                const newInstructions = criarComponentePWA();
                newInstructions.style.display = 'block';
            }
        }, 5000);
    }
    
    // Executar funções
    adicionarEstilosPWA();
    criarComponentePWA().style.display = 'none'; // Criar mas manter oculto inicialmente
    adicionarLinkMenu();
    adicionarSecaoFooter();
    verificarExibicao();
    
    // Adicionar suporte a service worker para PWA
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/service-worker.js')
                .then(function(registration) {
                    console.log('Service Worker registrado com sucesso:', registration.scope);
                })
                .catch(function(error) {
                    console.log('Falha ao registrar Service Worker:', error);
                });
        });
    }
});
