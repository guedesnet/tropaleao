// Implementação da funcionalidade de PNR (Pedido Não Recebido)
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const nomeClienteInput = document.getElementById('nome-cliente');
    const nomeMotoristaInput = document.getElementById('nome-motorista');
    const codigoPedidoInput = document.getElementById('codigo-pedido');
    const gerarMensagemBtn = document.getElementById('gerarMensagemPNR');
    const mensagemPNRDiv = document.getElementById('mensagem-pnr');
    const copiarMensagemBtn = document.getElementById('copiarMensagemPNR');
    const enviarWhatsAppBtn = document.getElementById('enviarWhatsAppPNR');
    
    // Adicionar eventos aos botões
    if (gerarMensagemBtn) {
        gerarMensagemBtn.addEventListener('click', gerarMensagemPNR);
    }
    
    if (copiarMensagemBtn) {
        copiarMensagemBtn.addEventListener('click', copiarMensagemPNR);
    }
    
    if (enviarWhatsAppBtn) {
        enviarWhatsAppBtn.addEventListener('click', enviarWhatsAppPNR);
    }
    
    // Função para gerar mensagem PNR
    function gerarMensagemPNR() {
        // Obter valores dos inputs
        const nomeCliente = nomeClienteInput.value.trim();
        const nomeMotorista = nomeMotoristaInput.value.trim();
        const codigoPedido = codigoPedidoInput.value.trim();
        
        // Validar inputs
        if (!nomeCliente || !nomeMotorista || !codigoPedido) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        
        // Gerar mensagem no formato exato solicitado
        const mensagem = `Olá, ${nomeCliente}!

Eu sou ${nomeMotorista}, entregador Shopee.

Gostaria de confirmar se a entrega do seu pedido ${codigoPedido} ocorreu como esperado.

Por favor, escolha uma das opções abaixo e envie o número correspondente:

1️⃣ Já *recebi* o pedido
2️⃣ Recebi, mas não era o que pedi ou veio quebrado
3️⃣ Não recebido`;
        
        // Exibir mensagem
        mensagemPNRDiv.textContent = mensagem;
        mensagemPNRDiv.style.whiteSpace = 'pre-wrap';
        
        // Habilitar botões
        copiarMensagemBtn.disabled = false;
        enviarWhatsAppBtn.disabled = false;
        
        // Adicionar classe de animação
        mensagemPNRDiv.classList.add('highlight');
        setTimeout(() => {
            mensagemPNRDiv.classList.remove('highlight');
        }, 1000);
    }
    
    // Função para copiar mensagem
    function copiarMensagemPNR() {
        const mensagem = mensagemPNRDiv.textContent;
        
        if (!mensagem) {
            alert('Nenhuma mensagem para copiar.');
            return;
        }
        
        // Copiar para a área de transferência
        navigator.clipboard.writeText(mensagem)
            .then(() => {
                // Mostrar feedback visual
                const textoOriginal = copiarMensagemBtn.textContent;
                copiarMensagemBtn.textContent = '✓ Copiado!';
                copiarMensagemBtn.classList.add('btn-success');
                
                setTimeout(() => {
                    copiarMensagemBtn.textContent = textoOriginal;
                    copiarMensagemBtn.classList.remove('btn-success');
                }, 2000);
            })
            .catch(err => {
                console.error('Erro ao copiar texto: ', err);
                alert('Não foi possível copiar automaticamente. Por favor, selecione e copie o texto manualmente.');
            });
    }
    
    // Função para enviar via WhatsApp
    function enviarWhatsAppPNR() {
        const mensagem = mensagemPNRDiv.textContent;
        
        if (!mensagem) {
            alert('Nenhuma mensagem para enviar.');
            return;
        }
        
        // Codificar mensagem para URL
        const mensagemCodificada = encodeURIComponent(mensagem);
        
        // Abrir WhatsApp Web com a mensagem
        window.open(`https://wa.me/?text=${mensagemCodificada}`, '_blank');
    }
    
    // Adicionar estilo para animação de destaque
    const style = document.createElement('style');
    style.textContent = `
        .highlight {
            animation: highlight-pulse 1s ease;
        }
        
        @keyframes highlight-pulse {
            0% { background-color: transparent; }
            50% { background-color: rgba(251, 100, 27, 0.2); }
            100% { background-color: transparent; }
        }
        
        .btn-success {
            background-color: #28a745 !important;
        }
        
        .mensagem-pnr {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 15px;
            font-family: Arial, sans-serif;
            line-height: 1.5;
        }
    `;
    document.head.appendChild(style);
});
