// Componente para exibir o vídeo tutorial de nota fiscal
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se a seção de nota fiscal existe
    const notaFiscalSection = document.querySelector('.nota-fiscal-section, #nota-fiscal-section');
    
    // Se não existir, tentar encontrar outra seção apropriada
    if (!notaFiscalSection) {
        // Criar uma nova seção para o tutorial de nota fiscal
        const mainContent = document.querySelector('main, .main-content, #content');
        
        if (mainContent) {
            // Criar a seção de tutorial
            const tutorialSection = document.createElement('section');
            tutorialSection.id = 'nota-fiscal-tutorial';
            tutorialSection.className = 'nota-fiscal-tutorial section';
            
            // Adicionar conteúdo
            tutorialSection.innerHTML = `
                <div class="container">
                    <h2 class="section-title">Tutorial de Nota Fiscal</h2>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="card tutorial-card">
                                <div class="card-body">
                                    <h3 class="card-title">Como emitir sua Nota Fiscal</h3>
                                    <p class="card-text">Assista ao vídeo tutorial que explica passo a passo como emitir sua nota fiscal eletrônica no portal nacional NFSe.</p>
                                    <div class="video-container">
                                        <div class="video-placeholder">
                                            <img src="images/video-placeholder.png" alt="Thumbnail do vídeo tutorial" class="img-fluid">
                                            <div class="play-button">
                                                <i class="fas fa-play-circle"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mt-3">
                                        <a href="https://drive.google.com/file/d/1Ot6LEI-RR-oMoydtflle3hJ7iJvw-3n3/view" target="_blank" class="btn btn-primary btn-block">
                                            <i class="fas fa-play-circle"></i> Assistir Tutorial Completo
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="card steps-card">
                                <div class="card-body">
                                    <h3 class="card-title">Passos Rápidos</h3>
                                    <ol class="steps-list">
                                        <li>Acesse o <a href="https://www.nfse.gov.br/EmissorNacional/Login?ReturnUrl=%2fEmissorNacional" target="_blank">Portal Nacional NFSe</a></li>
                                        <li>Faça login com seu certificado digital ou gov.br</li>
                                        <li>Selecione "Emitir NFS-e"</li>
                                        <li>Preencha os dados do tomador (cliente)</li>
                                        <li>Informe o serviço prestado e valor</li>
                                        <li>Revise as informações e confirme a emissão</li>
                                        <li>Faça o download do PDF para seus registros</li>
                                    </ol>
                                    <div class="alert alert-info mt-3">
                                        <i class="fas fa-info-circle"></i> Lembre-se: A emissão de nota fiscal é obrigatória para todos os serviços prestados.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // Adicionar a seção ao conteúdo principal
            // Encontrar um local apropriado para inserir
            const targetSection = document.querySelector('#links-section, .links-section, #ferramentas, .ferramentas');
            if (targetSection) {
                mainContent.insertBefore(tutorialSection, targetSection.nextSibling);
            } else {
                mainContent.appendChild(tutorialSection);
            }
            
            // Adicionar evento para o placeholder do vídeo
            const videoPlaceholder = tutorialSection.querySelector('.video-placeholder');
            if (videoPlaceholder) {
                videoPlaceholder.addEventListener('click', function() {
                    window.open('https://drive.google.com/file/d/1Ot6LEI-RR-oMoydtflle3hJ7iJvw-3n3/view', '_blank');
                });
            }
        }
    } else {
        // Adicionar o componente de vídeo à seção existente
        const videoComponent = document.createElement('div');
        videoComponent.className = 'video-tutorial-component';
        videoComponent.innerHTML = `
            <div class="card mb-4">
                <div class="card-body">
                    <h3 class="card-title">Tutorial em Vídeo: Como Emitir Nota Fiscal</h3>
                    <div class="video-container">
                        <div class="video-placeholder">
                            <img src="images/video-placeholder.png" alt="Thumbnail do vídeo tutorial" class="img-fluid">
                            <div class="play-button">
                                <i class="fas fa-play-circle"></i>
                            </div>
                        </div>
                    </div>
                    <p class="card-text mt-3">Assista ao vídeo tutorial que explica passo a passo como emitir sua nota fiscal eletrônica no portal nacional NFSe.</p>
                    <a href="https://drive.google.com/file/d/1Ot6LEI-RR-oMoydtflle3hJ7iJvw-3n3/view" target="_blank" class="btn btn-primary">
                        <i class="fas fa-play-circle"></i> Assistir Tutorial Completo
                    </a>
                </div>
            </div>
        `;
        
        notaFiscalSection.appendChild(videoComponent);
        
        // Adicionar evento para o placeholder do vídeo
        const videoPlaceholder = videoComponent.querySelector('.video-placeholder');
        if (videoPlaceholder) {
            videoPlaceholder.addEventListener('click', function() {
                window.open('https://drive.google.com/file/d/1Ot6LEI-RR-oMoydtflle3hJ7iJvw-3n3/view', '_blank');
            });
        }
    }
    
    // Adicionar estilos para o componente de vídeo
    const style = document.createElement('style');
    style.textContent = `
        .video-tutorial-component .card {
            border-left: 4px solid #FB641B;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .video-container {
            position: relative;
            margin: 15px 0;
        }
        
        .video-placeholder {
            position: relative;
            cursor: pointer;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        
        .video-placeholder img {
            width: 100%;
            transition: transform 0.3s ease;
        }
        
        .video-placeholder:hover img {
            transform: scale(1.05);
        }
        
        .play-button {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 4rem;
            color: #FB641B;
            background-color: rgba(255,255,255,0.8);
            border-radius: 50%;
            width: 80px;
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        }
        
        .video-placeholder:hover .play-button {
            background-color: #FB641B;
            color: white;
        }
        
        .steps-list {
            padding-left: 20px;
        }
        
        .steps-list li {
            margin-bottom: 10px;
            position: relative;
            padding-left: 5px;
        }
        
        .nota-fiscal-tutorial {
            padding: 40px 0;
            background-color: #f9f9f9;
            margin: 30px 0;
        }
        
        .section-title {
            text-align: center;
            margin-bottom: 30px;
            color: #333;
            position: relative;
            padding-bottom: 15px;
        }
        
        .section-title:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 80px;
            height: 3px;
            background-color: #FB641B;
        }
    `;
    document.head.appendChild(style);
    
    // Criar placeholder de imagem se não existir
    const checkPlaceholderImage = () => {
        const placeholders = document.querySelectorAll('.video-placeholder img');
        placeholders.forEach(placeholder => {
            if (placeholder.src.includes('video-placeholder.png')) {
                // Criar uma imagem de placeholder dinâmica
                const canvas = document.createElement('canvas');
                canvas.width = 640;
                canvas.height = 360;
                const ctx = canvas.getContext('2d');
                
                // Fundo
                ctx.fillStyle = '#f0f0f0';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                // Texto
                ctx.fillStyle = '#666666';
                ctx.font = 'bold 24px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('Tutorial: Como Emitir Nota Fiscal', canvas.width / 2, canvas.height / 2 - 15);
                ctx.font = '18px Arial';
                ctx.fillText('Clique para assistir', canvas.width / 2, canvas.height / 2 + 20);
                
                // Ícone de play (simplificado)
                ctx.beginPath();
                ctx.arc(canvas.width / 2, canvas.height / 2 - 60, 30, 0, Math.PI * 2);
                ctx.fillStyle = '#FB641B';
                ctx.fill();
                ctx.fillStyle = 'white';
                ctx.beginPath();
                ctx.moveTo(canvas.width / 2 - 10, canvas.height / 2 - 70);
                ctx.lineTo(canvas.width / 2 - 10, canvas.height / 2 - 50);
                ctx.lineTo(canvas.width / 2 + 15, canvas.height / 2 - 60);
                ctx.closePath();
                ctx.fill();
                
                // Atualizar a imagem
                placeholder.src = canvas.toDataURL('image/png');
            }
        });
    };
    
    // Executar após um pequeno atraso para garantir que o DOM esteja pronto
    setTimeout(checkPlaceholderImage, 500);
});
