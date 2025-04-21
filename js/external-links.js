// Configuração atualizada de links externos
document.addEventListener('DOMContentLoaded', function() {
    // Links externos configurados com as atualizações solicitadas
    const externalLinks = {
        'disponibilidade': 'https://docs.google.com/forms/d/1PqeA3JWDK2D3nhH7NS8jReocrTxlXl60gWTh0eeZLwU/edit',
        'nota-fiscal': 'https://www.nfse.gov.br/EmissorNacional/Login?ReturnUrl=%2fEmissorNacional',
        'whatsapp-suporte': 'https://wa.me/5521981072410',
        'hub-location': 'https://www.google.com/maps/place/GLP+CAMPO+GRANDE/@-22.866353,-43.5745271,17z/data=!3m1!4b1!4m6!3m5!1s0x9be32334b3fab9:0xf5f555d70fe8c22f!8m2!3d-22.866353!4d-43.5745271!16s%2Fg%2F11rts0d5r0?entry=ttu',
        'nota-fiscal-video': 'https://drive.google.com/file/d/1Ot6LEI-RR-oMoydtflle3hJ7iJvw-3n3/view'
    };
    
    // Configurar links no HTML
    function configurarLinks() {
        // Link para confirmar disponibilidade
        const disponibilidadeLinks = document.querySelectorAll('a[href*="disponibilidade"]');
        disponibilidadeLinks.forEach(link => {
            link.href = externalLinks.disponibilidade;
            link.target = '_blank';
            link.setAttribute('rel', 'noopener noreferrer');
        });
        
        // Link para nota fiscal
        const notaFiscalLinks = document.querySelectorAll('a[href*="nota-fiscal"], a[href*="nfse"]');
        notaFiscalLinks.forEach(link => {
            link.href = externalLinks['nota-fiscal'];
            link.target = '_blank';
            link.setAttribute('rel', 'noopener noreferrer');
        });
        
        // Link para suporte WhatsApp
        const whatsappLinks = document.querySelectorAll('a[href*="whatsapp"], a[href*="wa.me"]');
        whatsappLinks.forEach(link => {
            // Verificar se não é um link de compartilhamento
            if (!link.id || !link.id.includes('compartilhar')) {
                link.href = externalLinks['whatsapp-suporte'];
                link.target = '_blank';
                link.setAttribute('rel', 'noopener noreferrer');
            }
        });
        
        // Link para localização do Hub (atualizado conforme solicitado)
        const hubLocationLink = document.getElementById('localizar-hub');
        if (hubLocationLink) {
            hubLocationLink.addEventListener('click', function(e) {
                e.preventDefault();
                window.open(externalLinks['hub-location'], '_blank');
            });
        }
        
        // Link para vídeo tutorial de nota fiscal
        const notaFiscalVideoLinks = document.querySelectorAll('a[href*="nota-fiscal-video"], a[href*="tutorial-nfse"]');
        notaFiscalVideoLinks.forEach(link => {
            link.href = externalLinks['nota-fiscal-video'];
            link.target = '_blank';
            link.setAttribute('rel', 'noopener noreferrer');
        });
        
        // Adicionar vídeo tutorial na seção de nota fiscal se existir
        const notaFiscalSection = document.querySelector('.nota-fiscal-section');
        if (notaFiscalSection) {
            // Verificar se o vídeo já existe
            if (!notaFiscalSection.querySelector('.video-tutorial')) {
                const videoDiv = document.createElement('div');
                videoDiv.className = 'video-tutorial';
                videoDiv.innerHTML = `
                    <h4>Tutorial em Vídeo</h4>
                    <p>Assista ao tutorial sobre como emitir nota fiscal:</p>
                    <a href="${externalLinks['nota-fiscal-video']}" target="_blank" class="btn btn-primary">
                        <i class="fas fa-play-circle"></i> Assistir Tutorial
                    </a>
                `;
                notaFiscalSection.appendChild(videoDiv);
            }
        }
    }
    
    // Adicionar instruções de PWA
    function adicionarInstrucoesPWA() {
        const footer = document.querySelector('footer');
        if (!footer) return;
        
        const pwaDiv = document.createElement('div');
        pwaDiv.className = 'pwa-instructions';
        pwaDiv.innerHTML = `
            <h4>Instalar como Aplicativo</h4>
            <p>Você pode adicionar este site à tela inicial do seu celular para acesso rápido:</p>
            <div class="pwa-steps">
                <div class="pwa-step">
                    <strong>Android (Chrome):</strong>
                    <ol>
                        <li>Toque no menu (três pontos) no canto superior direito</li>
                        <li>Selecione "Adicionar à tela inicial"</li>
                        <li>Confirme a adição</li>
                    </ol>
                </div>
                <div class="pwa-step">
                    <strong>iPhone (Safari):</strong>
                    <ol>
                        <li>Toque no ícone de compartilhamento (retângulo com seta)</li>
                        <li>Role para baixo e toque em "Adicionar à Tela de Início"</li>
                        <li>Toque em "Adicionar" no canto superior direito</li>
                    </ol>
                </div>
            </div>
        `;
        
        // Adicionar antes do último elemento do footer
        const lastElement = footer.lastElementChild;
        if (lastElement) {
            footer.insertBefore(pwaDiv, lastElement);
        } else {
            footer.appendChild(pwaDiv);
        }
        
        // Adicionar estilos
        const style = document.createElement('style');
        style.textContent = `
            .pwa-instructions {
                background-color: #f8f9fa;
                border-radius: 8px;
                padding: 15px;
                margin: 20px 0;
                border-left: 4px solid #FB641B;
            }
            
            .pwa-steps {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 15px;
                margin-top: 10px;
            }
            
            @media (max-width: 768px) {
                .pwa-steps {
                    grid-template-columns: 1fr;
                }
            }
            
            .pwa-step {
                background-color: white;
                padding: 10px;
                border-radius: 4px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            }
            
            .pwa-step ol {
                padding-left: 20px;
                margin: 5px 0;
            }
            
            .video-tutorial {
                background-color: #f8f9fa;
                border-radius: 8px;
                padding: 15px;
                margin: 15px 0;
                text-align: center;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Executar configuração
    configurarLinks();
    adicionarInstrucoesPWA();
    
    console.log('Links externos atualizados e instruções PWA adicionadas com sucesso');
});
