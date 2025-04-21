// Implementação atualizada da funcionalidade de Pedido Não Recebido (PNR)
document.addEventListener('DOMContentLoaded', function() {
    const nomeClienteInput = document.getElementById('nome-cliente');
    const nomeMotoristaInput = document.getElementById('nome-motorista');
    const codigoPedidoInput = document.getElementById('codigo-pedido');
    const gerarMensagemBtn = document.getElementById('gerarMensagemPNR');
    const mensagemPNRDiv = document.getElementById('mensagem-pnr');
    const copiarMensagemBtn = document.getElementById('copiarMensagemPNR');
    const enviarWhatsAppBtn = document.getElementById('enviarWhatsAppPNR');
    
    if (gerarMensagemBtn) {
        gerarMensagemBtn.addEventListener('click', gerarMensagemPNR);
    }
    
    if (copiarMensagemBtn) {
        copiarMensagemBtn.addEventListener('click', copiarMensagem);
    }
    
    if (enviarWhatsAppBtn) {
        enviarWhatsAppBtn.addEventListener('click', enviarWhatsApp);
    }
    
    // Gerar mensagem para PNR
    function gerarMensagemPNR() {
        const nomeCliente = nomeClienteInput.value.trim();
        const nomeMotorista = nomeMotoristaInput.value.trim();
        const codigoPedido = codigoPedidoInput.value.trim();
        
        if (!nomeCliente || !nomeMotorista || !codigoPedido) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        
        // Validar formato do código do pedido (geralmente começa com BR)
        if (!codigoPedido.match(/^BR\d+/i) && !confirm('O código do pedido geralmente começa com BR seguido de números. Deseja continuar mesmo assim?')) {
            return;
        }
        
        // Gerar mensagem formatada com o novo template solicitado
        const mensagem = `Olá, ${nomeCliente}!

Eu sou ${nomeMotorista}, entregador Shopee.

Gostaria de confirmar se a entrega do seu pedido ${codigoPedido.toUpperCase()} ocorreu como esperado.

Por favor, escolha uma das opções abaixo e envie o número correspondente:

1️⃣ Já *recebi* o pedido
2️⃣ Recebi, mas não era o que pedi ou veio quebrado
3️⃣ Não recebido`;
        
        // Exibir mensagem
        mensagemPNRDiv.textContent = mensagem;
        
        // Habilitar botões
        copiarMensagemBtn.disabled = false;
        enviarWhatsAppBtn.disabled = false;
        
        // Animar o resultado
        mensagemPNRDiv.style.animation = 'none';
        setTimeout(() => {
            mensagemPNRDiv.style.animation = 'highlight 1s';
        }, 10);
        
        // Salvar no localStorage para uso futuro
        try {
            localStorage.setItem('ultimoPNR', JSON.stringify({
                nomeMotorista
            }));
        } catch (e) {
            console.error('Erro ao salvar no localStorage:', e);
        }
    }
    
    // Copiar mensagem para a área de transferência
    function copiarMensagem() {
        const mensagem = mensagemPNRDiv.textContent;
        
        if (!mensagem) return;
        
        // Usar a API de clipboard
        navigator.clipboard.writeText(mensagem)
            .then(() => {
                // Feedback visual
                const textoOriginal = copiarMensagemBtn.textContent;
                copiarMensagemBtn.textContent = 'Copiado!';
                
                setTimeout(() => {
                    copiarMensagemBtn.textContent = textoOriginal;
                }, 2000);
            })
            .catch(err => {
                console.error('Erro ao copiar texto: ', err);
                alert('Não foi possível copiar a mensagem. Por favor, copie manualmente.');
                
                // Selecionar o texto para facilitar cópia manual
                const range = document.createRange();
                range.selectNode(mensagemPNRDiv);
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);
            });
    }
    
    // Enviar mensagem via WhatsApp
    function enviarWhatsApp() {
        const mensagem = mensagemPNRDiv.textContent;
        
        if (!mensagem) return;
        
        // Perguntar se deseja adicionar número de telefone
        const usarNumero = confirm('Deseja enviar para um número específico? Clique em OK para adicionar o número ou Cancelar para criar apenas a mensagem.');
        
        if (usarNumero) {
            const numero = prompt('Digite o número de telefone com DDD (apenas números):', '');
            
            if (numero && numero.trim()) {
                // Validar formato do número
                const numeroLimpo = numero.replace(/\D/g, '');
                
                if (numeroLimpo.length < 10 || numeroLimpo.length > 11) {
                    alert('Número de telefone inválido. Use o formato com DDD (ex: 21987654321)');
                    return;
                }
                
                // Codificar a mensagem para URL
                const mensagemCodificada = encodeURIComponent(mensagem);
                
                // Abrir WhatsApp com número e mensagem
                window.open(`https://wa.me/55${numeroLimpo}?text=${mensagemCodificada}`, '_blank');
                return;
            }
        }
        
        // Se não usar número ou cancelar, apenas criar a mensagem
        const mensagemCodificada = encodeURIComponent(mensagem);
        window.open(`https://wa.me/?text=${mensagemCodificada}`, '_blank');
    }
    
    // Adicionar eventos de tecla Enter para os inputs
    if (nomeClienteInput && nomeMotoristaInput && codigoPedidoInput) {
        [nomeClienteInput, nomeMotoristaInput, codigoPedidoInput].forEach(input => {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    gerarMensagemPNR();
                }
            });
        });
    }
    
    // Carregar nome do motorista salvo anteriormente
    try {
        const ultimoPNR = JSON.parse(localStorage.getItem('ultimoPNR'));
        if (ultimoPNR && ultimoPNR.nomeMotorista) {
            nomeMotoristaInput.value = ultimoPNR.nomeMotorista;
        }
    } catch (e) {
        console.error('Erro ao carregar do localStorage:', e);
    }
    
    // Formatar automaticamente o código do pedido
    if (codigoPedidoInput) {
        codigoPedidoInput.addEventListener('input', function(e) {
            let value = e.target.value.toUpperCase();
            
            // Se começar a digitar números, adicionar BR automaticamente
            if (value.length > 0 && !value.startsWith('BR') && /^\d+$/.test(value)) {
                value = 'BR' + value;
            }
            
            e.target.value = value;
        });
    }
    
    // Adicionar estilo para melhorar a aparência
    const style = document.createElement('style');
    style.textContent = `
        .pnr-container {
            background-color: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
            border-left: 4px solid #FB641B;
        }
        
        .pnr-form {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
        }
        
        @media (max-width: 768px) {
            .pnr-form {
                grid-template-columns: 1fr;
            }
        }
        
        .pnr-form label {
            font-weight: bold;
            margin-bottom: 5px;
            display: block;
        }
        
        .pnr-form input {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        
        .pnr-buttons {
            display: flex;
            gap: 10px;
            margin-top: 15px;
        }
        
        .pnr-message {
            background-color: white;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 15px;
            margin-top: 20px;
            white-space: pre-wrap;
            font-family: Arial, sans-serif;
        }
        
        .pnr-info {
            margin-top: 15px;
            font-size: 14px;
            color: #666;
        }
    `;
    document.head.appendChild(style);
    
    // Melhorar a estrutura do HTML se possível
    const pnrContainer = document.querySelector('.pnr-container');
    if (pnrContainer) {
        // Adicionar informações de uso
        const pnrInfo = document.createElement('div');
        pnrInfo.className = 'pnr-info';
        pnrInfo.innerHTML = `
            <p><strong>Dica:</strong> Use esta mensagem para confirmar se o cliente recebeu o pedido. 
            Você pode copiar o texto ou enviar diretamente pelo WhatsApp.</p>
        `;
        pnrContainer.appendChild(pnrInfo);
    }
});
