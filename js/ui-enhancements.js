// Melhorias de UI e interatividade para o site SUPORTE DOS CRIA
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar animações e efeitos visuais
    adicionarAnimacoes();
    
    // Melhorar a responsividade
    melhorarResponsividade();
    
    // Adicionar ícones interativos
    adicionarIconesInterativos();
    
    // Melhorar a navegação
    melhorarNavegacao();
    
    // Adicionar feedback visual para ações
    adicionarFeedbackVisual();
    
    // Adicionar efeitos de rolagem
    adicionarEfeitosRolagem();
    
    // Função para adicionar animações e efeitos visuais
    function adicionarAnimacoes() {
        // Adicionar estilos para animações
        const style = document.createElement('style');
        style.textContent = `
            /* Animações gerais */
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideInUp {
                from {
                    transform: translateY(30px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
            
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                40% { transform: translateY(-10px); }
                60% { transform: translateY(-5px); }
            }
            
            /* Aplicar animações aos elementos */
            .section {
                animation: fadeIn 0.8s ease forwards;
            }
            
            .card, .feature-box {
                animation: slideInUp 0.6s ease forwards;
            }
            
            .btn-primary, .btn-success {
                transition: all 0.3s ease;
            }
            
            .btn-primary:hover, .btn-success:hover {
                transform: translateY(-3px);
                box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            }
            
            .btn-primary:active, .btn-success:active {
                transform: translateY(0);
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            
            /* Efeito de destaque para elementos importantes */
            .highlight-element {
                position: relative;
                overflow: hidden;
            }
            
            .highlight-element::after {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                animation: shine 2s infinite;
            }
            
            @keyframes shine {
                to {
                    left: 100%;
                }
            }
            
            /* Melhorar aparência dos cards */
            .card {
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            
            .card:hover {
                transform: translateY(-5px);
                box-shadow: 0 8px 25px rgba(0,0,0,0.15);
            }
            
            /* Melhorar aparência dos botões */
            .btn {
                border-radius: 50px;
                padding: 10px 20px;
                font-weight: bold;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                transition: all 0.3s ease;
            }
            
            /* Estilo para ícones */
            .feature-icon {
                font-size: 2.5rem;
                margin-bottom: 15px;
                color: #FB641B;
                transition: transform 0.3s ease;
            }
            
            .feature-box:hover .feature-icon {
                transform: scale(1.2);
            }
        `;
        document.head.appendChild(style);
        
        // Adicionar classes para elementos existentes
        document.querySelectorAll('.card').forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
        
        document.querySelectorAll('.section').forEach((section, index) => {
            section.style.animationDelay = `${index * 0.2}s`;
        });
        
        // Adicionar efeito de destaque para elementos importantes
        document.querySelectorAll('.btn-primary, .important-feature').forEach(el => {
            el.classList.add('highlight-element');
        });
    }
    
    // Função para melhorar a responsividade
    function melhorarResponsividade() {
        const style = document.createElement('style');
        style.textContent = `
            /* Melhorias de responsividade */
            @media (max-width: 768px) {
                .container {
                    padding-left: 15px;
                    padding-right: 15px;
                }
                
                .row {
                    margin-left: -10px;
                    margin-right: -10px;
                }
                
                .col, .col-md-6, .col-lg-4 {
                    padding-left: 10px;
                    padding-right: 10px;
                }
                
                h1 {
                    font-size: 2rem;
                }
                
                h2 {
                    font-size: 1.8rem;
                }
                
                .card {
                    margin-bottom: 20px;
                }
                
                .navbar-brand {
                    font-size: 1.2rem;
                }
                
                .btn {
                    padding: 8px 16px;
                    font-size: 0.9rem;
                }
            }
            
            /* Melhorias para telas muito pequenas */
            @media (max-width: 480px) {
                h1 {
                    font-size: 1.8rem;
                }
                
                h2 {
                    font-size: 1.5rem;
                }
                
                .btn {
                    display: block;
                    width: 100%;
                    margin-bottom: 10px;
                }
                
                .btn-group .btn {
                    display: inline-block;
                    width: auto;
                    margin-bottom: 0;
                }
            }
            
            /* Melhorar espaçamento em dispositivos móveis */
            @media (max-width: 768px) {
                .section {
                    padding: 40px 0;
                }
                
                .container {
                    max-width: 100%;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Ajustar tamanho de fonte para melhor legibilidade em dispositivos móveis
        const viewport = document.querySelector('meta[name="viewport"]');
        if (!viewport) {
            const meta = document.createElement('meta');
            meta.name = 'viewport';
            meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0';
            document.head.appendChild(meta);
        } else {
            viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0';
        }
    }
    
    // Função para adicionar ícones interativos
    function adicionarIconesInterativos() {
        // Verificar se o FontAwesome já está carregado
        const fontAwesomeLoaded = document.querySelector('link[href*="fontawesome"]') || 
                                 document.querySelector('script[src*="fontawesome"]');
        
        // Se não estiver carregado, adicionar
        if (!fontAwesomeLoaded) {
            const fontAwesomeLink = document.createElement('link');
            fontAwesomeLink.rel = 'stylesheet';
            fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
            document.head.appendChild(fontAwesomeLink);
        }
        
        // Adicionar estilos para ícones interativos
        const style = document.createElement('style');
        style.textContent = `
            .interactive-icon {
                font-size: 1.5rem;
                color: #FB641B;
                cursor: pointer;
                transition: all 0.3s ease;
                margin: 0 5px;
            }
            
            .interactive-icon:hover {
                transform: scale(1.2);
                color: #e05a19;
            }
            
            .icon-with-text {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-bottom: 15px;
            }
            
            .icon-with-text i {
                font-size: 1.8rem;
                color: #FB641B;
                transition: all 0.3s ease;
            }
            
            .icon-with-text:hover i {
                transform: scale(1.1);
            }
            
            .icon-with-text .icon-text {
                flex: 1;
            }
            
            .icon-with-text .icon-text h4 {
                margin: 0 0 5px 0;
                font-size: 1.2rem;
            }
            
            .icon-with-text .icon-text p {
                margin: 0;
                color: #666;
            }
            
            /* Ícones flutuantes */
            .floating-icon {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 50px;
                height: 50px;
                background-color: #FB641B;
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
                box-shadow: 0 4px 10px rgba(0,0,0,0.2);
                cursor: pointer;
                z-index: 999;
                transition: all 0.3s ease;
            }
            
            .floating-icon:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 15px rgba(0,0,0,0.3);
            }
            
            /* Menu de ícones flutuantes */
            .floating-menu {
                position: fixed;
                bottom: 80px;
                right: 20px;
                display: flex;
                flex-direction: column;
                gap: 10px;
                z-index: 998;
                transition: all 0.3s ease;
                opacity: 0;
                pointer-events: none;
                transform: translateY(20px);
            }
            
            .floating-menu.active {
                opacity: 1;
                pointer-events: all;
                transform: translateY(0);
            }
            
            .floating-menu-item {
                width: 40px;
                height: 40px;
                background-color: white;
                color: #FB641B;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.2rem;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .floating-menu-item:hover {
                transform: scale(1.1);
                box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            }
            
            /* Tooltip para ícones flutuantes */
            .floating-menu-item {
                position: relative;
            }
            
            .floating-menu-item::before {
                content: attr(data-tooltip);
                position: absolute;
                right: 50px;
                top: 50%;
                transform: translateY(-50%);
                background-color: #333;
                color: white;
                padding: 5px 10px;
                border-radius: 4px;
                font-size: 12px;
                white-space: nowrap;
                opacity: 0;
                pointer-events: none;
                transition: all 0.3s ease;
            }
            
            .floating-menu-item:hover::before {
                opacity: 1;
                right: 55px;
            }
        `;
        document.head.appendChild(style);
        
        // Adicionar ícones aos botões existentes
        document.querySelectorAll('.btn').forEach(btn => {
            const btnText = btn.textContent.trim();
            
            // Adicionar ícones com base no texto do botão
            if (btnText.toLowerCase().includes('buscar') || btnText.toLowerCase().includes('pesquisar')) {
                btn.innerHTML = `<i class="fas fa-search"></i> ${btnText}`;
            } else if (btnText.toLowerCase().includes('calcular')) {
                btn.innerHTML = `<i class="fas fa-calculator"></i> ${btnText}`;
            } else if (btnText.toLowerCase().includes('otimizar')) {
                btn.innerHTML = `<i class="fas fa-route"></i> ${btnText}`;
            } else if (btnText.toLowerCase().includes('pdf') || btnText.toLowerCase().includes('gerar')) {
                btn.innerHTML = `<i class="fas fa-file-pdf"></i> ${btnText}`;
            } else if (btnText.toLowerCase().includes('whatsapp') || btnText.toLowerCase().includes('compartilhar')) {
                btn.innerHTML = `<i class="fab fa-whatsapp"></i> ${btnText}`;
            } else if (btnText.toLowerCase().includes('limpar')) {
                btn.innerHTML = `<i class="fas fa-trash-alt"></i> ${btnText}`;
            } else if (btnText.toLowerCase().includes('upload')) {
                btn.innerHTML = `<i class="fas fa-upload"></i> ${btnText}`;
            }
        });
        
        // Adicionar menu flutuante de ações rápidas
        const floatingMenu = document.createElement('div');
        floatingMenu.className = 'floating-menu';
        
        const floatingMenuItems = [
            { icon: 'fa-search', tooltip: 'Buscar CEP', action: () => scrollToSection('busca-cep') },
            { icon: 'fa-calculator', tooltip: 'Calculadoras', action: () => scrollToSection('calculadoras') },
            { icon: 'fa-route', tooltip: 'Otimizar Rota', action: () => scrollToSection('otimizacao-rota') },
            { icon: 'fa-comment', tooltip: 'Chat IA', action: () => scrollToSection('chat-ia') },
            { icon: 'fa-arrow-up', tooltip: 'Topo', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) }
        ];
        
        floatingMenuItems.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.className = 'floating-menu-item';
            menuItem.setAttribute('data-tooltip', item.tooltip);
            menuItem.innerHTML = `<i class="fas ${item.icon}"></i>`;
            menuItem.addEventListener('click', item.action);
            floatingMenu.appendChild(menuItem);
        });
        
        const floatingIcon = document.createElement('div');
        floatingIcon.className = 'floating-icon';
        floatingIcon.innerHTML = '<i class="fas fa-plus"></i>';
        floatingIcon.addEventListener('click', function() {
            this.classList.toggle('active');
            floatingMenu.classList.toggle('active');
            
            // Alternar ícone
            if (floatingMenu.classList.contains('active')) {
                this.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                this.innerHTML = '<i class="fas fa-plus"></i>';
            }
        });
        
        document.body.appendChild(floatingMenu);
        document.body.appendChild(floatingIcon);
        
        // Função para rolar até uma seção
        function scrollToSection(sectionId) {
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
            
            // Fechar o menu flutuante
            floatingIcon.classList.remove('active');
            floatingMenu.classList.remove('active');
            floatingIcon.innerHTML = '<i class="fas fa-plus"></i>';
        }
    }
    
    // Função para melhorar a navegação
    function melhorarNavegacao() {
        // Adicionar estilos para navegação
        const style = document.createElement('style');
        style.textContent = `
            /* Melhorar aparência da navegação */
            .navbar {
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                padding: 15px 0;
                transition: all 0.3s ease;
            }
            
            .navbar.scrolled {
                padding: 10px 0;
                background-color: rgba(255,255,255,0.95) !important;
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            }
            
            .navbar-brand {
                font-weight: bold;
                font-size: 1.5rem;
                color: #FB641B !important;
            }
            
            .nav-link {
                font-weight: 500;
                position: relative;
                padding: 8px 15px !important;
                margin: 0 5px;
                transition: all 0.3s ease;
            }
            
            .nav-link::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 50%;
                width: 0;
                height: 2px;
                background-color: #FB641B;
                transition: all 0.3s ease;
                transform: translateX(-50%);
            }
            
            .nav-link:hover::after,
            .nav-link.active::after {
                width: 80%;
            }
            
            /* Melhorar menu mobile */
            @media (max-width: 991px) {
                .navbar-collapse {
                    background-color: white;
                    border-radius: 10px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                    padding: 15px;
                    margin-top: 10px;
                }
                
                .nav-link {
                    padding: 10px 15px !important;
                    margin: 5px 0;
                    border-radius: 5px;
                }
                
                .nav-link:hover,
                .nav-link.active {
                    background-color: rgba(251, 100, 27, 0.1);
                }
                
                .nav-link::after {
                    display: none;
                }
            }
            
            /* Indicador de progresso de rolagem */
            .scroll-progress {
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 3px;
                background-color: #FB641B;
                z-index: 9999;
                transition: width 0.1s ease;
            }
            
            /* Melhorar aparência do botão de menu mobile */
            .navbar-toggler {
                border: none;
                padding: 0;
                width: 30px;
                height: 30px;
                position: relative;
            }
            
            .navbar-toggler:focus {
                outline: none;
                box-shadow: none;
            }
            
            .navbar-toggler-icon {
                background-image: none !important;
                position: relative;
                width: 30px;
                height: 2px;
                background-color: #FB641B;
                display: inline-block;
                transition: all 0.3s ease;
            }
            
            .navbar-toggler-icon::before,
            .navbar-toggler-icon::after {
                content: '';
                position: absolute;
                width: 30px;
                height: 2px;
                background-color: #FB641B;
                left: 0;
                transition: all 0.3s ease;
            }
            
            .navbar-toggler-icon::before {
                top: -8px;
            }
            
            .navbar-toggler-icon::after {
                bottom: -8px;
            }
            
            .navbar-toggler[aria-expanded="true"] .navbar-toggler-icon {
                background-color: transparent;
            }
            
            .navbar-toggler[aria-expanded="true"] .navbar-toggler-icon::before {
                transform: rotate(45deg);
                top: 0;
            }
            
            .navbar-toggler[aria-expanded="true"] .navbar-toggler-icon::after {
                transform: rotate(-45deg);
                bottom: 0;
            }
        `;
        document.head.appendChild(style);
        
        // Adicionar indicador de progresso de rolagem
        const scrollProgress = document.createElement('div');
        scrollProgress.className = 'scroll-progress';
        document.body.appendChild(scrollProgress);
        
        // Atualizar indicador de progresso durante a rolagem
        window.addEventListener('scroll', function() {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            scrollProgress.style.width = scrolled + '%';
            
            // Adicionar classe à navbar quando rolar
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }
        });
        
        // Destacar link ativo na navegação
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', function() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    // Função para adicionar feedback visual para ações
    function adicionarFeedbackVisual() {
        // Adicionar estilos para feedback visual
        const style = document.createElement('style');
        style.textContent = `
            /* Efeito de ripple para botões */
            .btn {
                position: relative;
                overflow: hidden;
            }
            
            .ripple {
                position: absolute;
                border-radius: 50%;
                background-color: rgba(255, 255, 255, 0.7);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            /* Toast de notificação */
            .toast-container {
                position: fixed;
                bottom: 20px;
                left: 20px;
                z-index: 9999;
            }
            
            .toast {
                background-color: #333;
                color: white;
                padding: 12px 20px;
                border-radius: 4px;
                margin-top: 10px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                display: flex;
                align-items: center;
                gap: 10px;
                transform: translateX(-100%);
                opacity: 0;
                transition: all 0.3s ease;
            }
            
            .toast.show {
                transform: translateX(0);
                opacity: 1;
            }
            
            .toast.success {
                background-color: #4CAF50;
            }
            
            .toast.error {
                background-color: #F44336;
            }
            
            .toast.info {
                background-color: #2196F3;
            }
            
            .toast.warning {
                background-color: #FF9800;
            }
            
            /* Efeito de loading */
            .loading-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(255, 255, 255, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.3s ease;
            }
            
            .loading-overlay.show {
                opacity: 1;
                pointer-events: all;
            }
            
            .loading-spinner {
                width: 50px;
                height: 50px;
                border: 5px solid #f3f3f3;
                border-top: 5px solid #FB641B;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        // Adicionar efeito de ripple aos botões
        document.addEventListener('click', function(e) {
            const target = e.target;
            
            if (target.classList.contains('btn')) {
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                
                const rect = target.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
                ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
                
                target.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            }
        });
        
        // Criar container para toasts
        const toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
        
        // Criar overlay de loading
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'loading-overlay';
        loadingOverlay.innerHTML = '<div class="loading-spinner"></div>';
        document.body.appendChild(loadingOverlay);
        
        // Adicionar funções globais para feedback visual
        window.showToast = function(message, type = 'info', duration = 3000) {
            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            
            let icon = '';
            switch (type) {
                case 'success':
                    icon = '<i class="fas fa-check-circle"></i>';
                    break;
                case 'error':
                    icon = '<i class="fas fa-exclamation-circle"></i>';
                    break;
                case 'warning':
                    icon = '<i class="fas fa-exclamation-triangle"></i>';
                    break;
                default:
                    icon = '<i class="fas fa-info-circle"></i>';
            }
            
            toast.innerHTML = `${icon} <span>${message}</span>`;
            toastContainer.appendChild(toast);
            
            // Mostrar toast com atraso para permitir a animação
            setTimeout(() => {
                toast.classList.add('show');
            }, 10);
            
            // Remover toast após a duração
            setTimeout(() => {
                toast.classList.remove('show');
                
                // Remover do DOM após a animação
                setTimeout(() => {
                    toast.remove();
                }, 300);
            }, duration);
        };
        
        window.showLoading = function(show = true) {
            if (show) {
                loadingOverlay.classList.add('show');
            } else {
                loadingOverlay.classList.remove('show');
            }
        };
        
        // Substituir alerts padrão por toasts
        const originalAlert = window.alert;
        window.alert = function(message) {
            window.showToast(message, 'info');
        };
    }
    
    // Função para adicionar efeitos de rolagem
    function adicionarEfeitosRolagem() {
        // Adicionar estilos para efeitos de rolagem
        const style = document.createElement('style');
        style.textContent = `
            /* Animações para elementos durante a rolagem */
            .scroll-animate {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.8s ease, transform 0.8s ease;
            }
            
            .scroll-animate.animated {
                opacity: 1;
                transform: translateY(0);
            }
            
            .scroll-animate-left {
                opacity: 0;
                transform: translateX(-50px);
                transition: opacity 0.8s ease, transform 0.8s ease;
            }
            
            .scroll-animate-left.animated {
                opacity: 1;
                transform: translateX(0);
            }
            
            .scroll-animate-right {
                opacity: 0;
                transform: translateX(50px);
                transition: opacity 0.8s ease, transform 0.8s ease;
            }
            
            .scroll-animate-right.animated {
                opacity: 1;
                transform: translateX(0);
            }
            
            .scroll-animate-scale {
                opacity: 0;
                transform: scale(0.8);
                transition: opacity 0.8s ease, transform 0.8s ease;
            }
            
            .scroll-animate-scale.animated {
                opacity: 1;
                transform: scale(1);
            }
            
            /* Botão de voltar ao topo */
            .back-to-top {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 40px;
                height: 40px;
                background-color: #FB641B;
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.3s ease;
                z-index: 998;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            }
            
            .back-to-top.show {
                opacity: 1;
                transform: translateY(0);
            }
            
            .back-to-top:hover {
                background-color: #e05a19;
                transform: translateY(-5px);
                box-shadow: 0 5px 10px rgba(0,0,0,0.3);
            }
        `;
        document.head.appendChild(style);
        
        // Adicionar classes de animação aos elementos
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            // Títulos com animação de baixo para cima
            const titles = section.querySelectorAll('h1, h2, h3');
            titles.forEach(title => {
                title.classList.add('scroll-animate');
            });
            
            // Cards com animação de escala
            const cards = section.querySelectorAll('.card');
            cards.forEach(card => {
                card.classList.add('scroll-animate-scale');
            });
            
            // Elementos da esquerda
            const leftElements = section.querySelectorAll('.col-md-6:nth-child(odd), .col-lg-6:nth-child(odd)');
            leftElements.forEach(el => {
                el.classList.add('scroll-animate-left');
            });
            
            // Elementos da direita
            const rightElements = section.querySelectorAll('.col-md-6:nth-child(even), .col-lg-6:nth-child(even)');
            rightElements.forEach(el => {
                el.classList.add('scroll-animate-right');
            });
            
            // Outros elementos com animação padrão
            const otherElements = section.querySelectorAll('p, .btn-group, form');
            otherElements.forEach(el => {
                el.classList.add('scroll-animate');
            });
        });
        
        // Função para verificar elementos visíveis e animar
        function checkVisibility() {
            const elements = document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale');
            
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementBottom = element.getBoundingClientRect().bottom;
                const isVisible = (elementTop < window.innerHeight - 100) && (elementBottom > 0);
                
                if (isVisible) {
                    element.classList.add('animated');
                }
            });
        }
        
        // Adicionar botão de voltar ao topo
        const backToTopBtn = document.createElement('div');
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(backToTopBtn);
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        // Mostrar/ocultar botão de voltar ao topo
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
            
            // Verificar elementos visíveis
            checkVisibility();
        });
        
        // Verificar elementos visíveis no carregamento inicial
        window.addEventListener('load', checkVisibility);
        
        // Verificar elementos visíveis após um pequeno atraso
        setTimeout(checkVisibility, 500);
    }
});
