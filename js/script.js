// Script principal
document.addEventListener('DOMContentLoaded', function() {
    // Menu responsivo
    const menuToggle = document.getElementById('menuToggle');
    const menu = document.getElementById('menu');
    
    if (menuToggle && menu) {
        menuToggle.addEventListener('click', function() {
            menu.classList.toggle('active');
        });
    }
    
    // Fechar menu ao clicar em um link
    const menuLinks = document.querySelectorAll('.menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            menu.classList.remove('active');
        });
    });
    
    // Inicializar o mapa (será substituído pela função real)
    window.initMap = function() {
        // Será implementado no arquivo cep.js
        console.log('Map initialization placeholder');
    };
    
    // Animação suave ao rolar para as seções
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Localização do Hub (exemplo)
    const localizarHub = document.getElementById('localizar-hub');
    if (localizarHub) {
        localizarHub.addEventListener('click', function(e) {
            e.preventDefault();
            // Coordenadas de exemplo - serão substituídas pelas reais
            const lat = -22.9035;
            const lng = -43.2096;
            window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
        });
    }
    
    // Verificar se há imagem de exemplo para a planilha
    const exemploImg = document.getElementById('exemplo-img');
    if (exemploImg) {
        // Criar imagem de exemplo se não existir
        exemploImg.onerror = function() {
            this.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22150%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20150%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder%22%3E%3Crect%20width%3D%22200%22%20height%3D%22150%22%20fill%3D%22%23f5f5f5%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20id%3D%22holder_text%22%20x%3D%2256.5%22%20y%3D%2275%22%3EExemplo%20de%20Planilha%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';
            this.alt = 'Exemplo de como copiar da planilha';
        };
    }
});
