// Integração com ChatGPT API
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendMessageBtn = document.getElementById('send-message');
    
    // Histórico de mensagens para contexto
    let messageHistory = [];
    
    // Verificar se os elementos existem
    if (!chatMessages || !userInput || !sendMessageBtn) return;
    
    // Adicionar eventos
    sendMessageBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Função para enviar mensagem
    function sendMessage() {
        const message = userInput.value.trim();
        
        if (!message) return;
        
        // Adicionar mensagem do usuário ao chat
        addMessageToChat('user', message);
        
        // Limpar input
        userInput.value = '';
        
        // Adicionar ao histórico
        messageHistory.push({ role: 'user', content: message });
        
        // Mostrar indicador de digitação
        addTypingIndicator();
        
        // Enviar para a API e obter resposta
        getChatResponse(message);
    }
    
    // Função para adicionar mensagem ao chat
    function addMessageToChat(sender, content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        // Processar links e formatação básica
        const formattedContent = formatMessage(content);
        contentDiv.innerHTML = formattedContent;
        
        messageDiv.appendChild(contentDiv);
        chatMessages.appendChild(messageDiv);
        
        // Rolar para a última mensagem
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Função para formatar mensagem
    function formatMessage(content) {
        // Converter URLs em links clicáveis
        let formatted = content.replace(
            /(https?:\/\/[^\s]+)/g, 
            '<a href="$1" target="_blank">$1</a>'
        );
        
        // Converter quebras de linha em <br>
        formatted = formatted.replace(/\n/g, '<br>');
        
        return formatted;
    }
    
    // Função para adicionar indicador de digitação
    function addTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot typing';
        typingDiv.id = 'typing-indicator';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
        
        typingDiv.appendChild(contentDiv);
        chatMessages.appendChild(typingDiv);
        
        // Rolar para a última mensagem
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Função para remover indicador de digitação
    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    // Função para obter resposta do ChatGPT
    function getChatResponse(message) {
        // Em um ambiente real, isso seria uma chamada AJAX para o backend
        // que por sua vez chamaria a API do ChatGPT
        
        // Preparar dados para a API
        const prompt = `Você é um assistente virtual para motoristas da Shopee. 
        Responda de forma útil, concisa e amigável sobre os seguintes tópicos:
        - Problemas mecânicos (moto/carros)
        - Suporte geral sobre Shopee
        - Uso do site SUPORTE DOS CRIA
        - Dicas de economia de combustível
        - Organização de entregas
        
        Pergunta do usuário: ${message}`;
        
        // Simular chamada à API
        // Em um ambiente real, usaríamos fetch() para chamar o backend
        simulateChatGPTResponse(prompt);
    }
    
    // Função para simular resposta do ChatGPT
    function simulateChatGPTResponse(prompt) {
        console.log('Enviando prompt para ChatGPT:', prompt);
        
        // Tópicos que o chat deve responder
        const topics = [
            { keywords: ['problema', 'mecânico', 'moto', 'carro', 'quebrou', 'conserto', 'oficina', 'barulho', 'motor'], 
              category: 'mecânica' },
            { keywords: ['shopee', 'entrega', 'pacote', 'cliente', 'pedido', 'atraso', 'endereço'], 
              category: 'entregas' },
            { keywords: ['combustível', 'gasolina', 'economia', 'consumo', 'gasto', 'economizar'], 
              category: 'combustível' },
            { keywords: ['rota', 'caminho', 'otimizar', 'otimização', 'trajeto', 'percurso'], 
              category: 'rotas' },
            { keywords: ['site', 'usar', 'função', 'ferramenta', 'ajuda', 'como'], 
              category: 'site' }
        ];
        
        // Verificar qual categoria melhor se encaixa na mensagem
        let bestMatch = { category: 'geral', score: 0 };
        const messageLower = prompt.toLowerCase();
        
        topics.forEach(topic => {
            let score = 0;
            topic.keywords.forEach(keyword => {
                if (messageLower.includes(keyword.toLowerCase())) {
                    score++;
                }
            });
            
            if (score > bestMatch.score) {
                bestMatch = { category: topic.category, score: score };
            }
        });
        
        console.log('Categoria identificada:', bestMatch.category);
        
        // Gerar resposta baseada na categoria
        let response = '';
        
        switch(bestMatch.category) {
            case 'mecânica':
                response = getRandomResponse([
                    'Para problemas mecânicos, recomendo verificar:\n\n1. Nível de óleo e data da última troca\n2. Condição dos pneus e calibragem\n3. Sistema de freios\n4. Bateria e sistema elétrico\n\nSe ouvir barulhos estranhos ou sentir vibrações, é melhor levar a um mecânico de confiança. Posso ajudar com dicas específicas se me contar mais sobre o problema.',
                    'Problemas mecânicos podem ter várias causas. Para motos e carros usados em entregas, é importante fazer manutenção preventiva regularmente:\n\n• Troca de óleo a cada 3.000-5.000 km\n• Verificação semanal dos pneus\n• Manutenção dos freios a cada 10.000 km\n• Verificação da corrente (motos) a cada 500 km\n\nQual problema específico você está enfrentando?',
                    'Para veículos de entrega, os problemas mais comuns são:\n\n1. Desgaste prematuro de freios e pneus\n2. Problemas elétricos por uso constante de ignição\n3. Superaquecimento em trânsito lento\n4. Embreagem desgastada (no caso de câmbio manual)\n\nRecomendo manter um registro de manutenções e sintomas para facilitar o diagnóstico pelo mecânico.'
                ]);
                break;
                
            case 'entregas':
                response = getRandomResponse([
                    'Para otimizar suas entregas Shopee:\n\n• Organize os pacotes por região antes de sair\n• Use o recurso de otimização de rota deste site\n• Mantenha contato com os clientes sobre horários\n• Tire foto da entrega como comprovante\n• Em caso de endereço não encontrado, use a função PNR deste site\n\nPrecisa de ajuda com algo específico sobre as entregas?',
                    'Dicas para entregas mais eficientes:\n\n1. Verifique todos os endereços antes de sair\n2. Agrupe entregas por bairro usando nossa ferramenta de otimização\n3. Comunique-se com clientes via WhatsApp antes de chegar\n4. Mantenha um kit básico de ferramentas e primeiros socorros\n5. Use aplicativos de navegação offline para economizar dados\n\nIsso ajuda a reduzir tempo e estresse durante as entregas.',
                    'Para lidar com problemas comuns nas entregas Shopee:\n\n• Endereço incorreto: use a busca de CEP deste site\n• Cliente ausente: use o modelo de mensagem PNR\n• Muitas entregas: use a calculadora de tempo para planejar sua jornada\n• Rotas ineficientes: use nossa ferramenta de otimização\n\nLembre-se que a comunicação clara com o cliente resolve a maioria dos problemas.'
                ]);
                break;
                
            case 'combustível':
                response = getRandomResponse([
                    'Dicas para economizar combustível:\n\n1. Mantenha a manutenção em dia (filtros, velas, óleo)\n2. Calibre os pneus semanalmente\n3. Evite acelerações bruscas e freadas repentinas\n4. Planeje sua rota para evitar congestionamentos\n5. Use a calculadora de combustível deste site para planejar gastos\n6. Desligue o motor em paradas longas\n\nUma condução suave pode economizar até 20% de combustível!',
                    'Para reduzir o consumo de combustível nas entregas:\n\n• Otimize suas rotas com nossa ferramenta\n• Mantenha velocidade constante (evite acelerações)\n• Verifique a pressão dos pneus 2x por semana\n• Faça manutenção preventiva regularmente\n• Remova peso desnecessário do veículo\n• Use ar-condicionado com moderação\n\nEstas práticas podem reduzir em até 30% seus gastos com combustível.',
                    'Economia de combustível para entregadores:\n\n1. Planejamento é fundamental - use nossa ferramenta de otimização\n2. Manutenção regular - filtros sujos aumentam consumo\n3. Direção defensiva - menos freadas = menos combustível\n4. Horários alternativos - evite picos de congestionamento\n5. Monitoramento - use nossa calculadora para acompanhar gastos\n\nLembre-se: cada real economizado em combustível é lucro direto para você!'
                ]);
                break;
                
            case 'rotas':
                response = getRandomResponse([
                    'Para otimizar sua rota de entregas:\n\n1. Use a função "Otimização de Rota" deste site\n2. Cole os dados da sua planilha no campo indicado\n3. O sistema organizará por ruas e sequência\n4. Gere um PDF colorido para facilitar a visualização\n5. Compartilhe via WhatsApp se precisar\n\nIsso vai economizar seu tempo e combustível. Precisa de ajuda para usar essa função?',
                    'Nossa ferramenta de otimização de rotas funciona assim:\n\n• Agrupa entregas por ruas e endereços similares\n• Organiza em sequência lógica para minimizar deslocamentos\n• Gera documento colorido para fácil visualização\n• Permite compartilhamento via WhatsApp\n\nPara usar, basta colar os dados da sua planilha de rotas no campo específico e clicar em "Otimizar Rota".',
                    'Dicas para rotas mais eficientes:\n\n1. Use nossa ferramenta de otimização para agrupar entregas próximas\n2. Verifique condições de trânsito antes de sair\n3. Considere horários de pico ao planejar sequência\n4. Para áreas desconhecidas, use a busca de CEP com mapa\n5. Salve o PDF gerado para consulta offline\n\nUma rota bem planejada pode reduzir em até 40% o tempo total de entregas!'
                ]);
                break;
                
            case 'site':
                response = getRandomResponse([
                    'Este site oferece várias ferramentas úteis:\n\n• Busca de CEP com mapa\n• Calculadoras de combustível e tempo de entrega\n• Otimização de rotas com geração de PDF\n• Chat de suporte (que você está usando agora)\n• Gerador de mensagens para Pedidos Não Recebidos\n• Links rápidos para serviços importantes\n\nQual dessas funções você gostaria de saber mais?',
                    'O SUPORTE DOS CRIA foi desenvolvido especialmente para motoristas Shopee, com ferramentas como:\n\n1. Busca de CEP integrada com Google Maps\n2. Calculadora de combustível para estimar gastos\n3. Calculadora de tempo de entrega\n4. Otimizador de rotas com agrupamento inteligente\n5. Gerador de PDF colorido para facilitar entregas\n6. Chat de suporte para dúvidas diversas\n\nTodas as funções são acessíveis pelo menu principal.',
                    'Para usar o site SUPORTE DOS CRIA:\n\n• Navegue pelas seções usando o menu superior\n• Em dispositivos móveis, toque no ícone de menu para ver as opções\n• Cada ferramenta tem instruções específicas de uso\n• Os resultados podem ser compartilhados via WhatsApp\n• Links externos abrem em nova aba para sua conveniência\n\nO site foi projetado para ser intuitivo e funcional tanto em celulares quanto em computadores.'
                ]);
                break;
                
            default:
                response = getRandomResponse([
                    'Posso ajudar com informações sobre entregas, economia de combustível, problemas mecânicos, uso do site e muito mais. Como posso te ajudar hoje?',
                    'Como assistente virtual dos motoristas Shopee, posso responder dúvidas sobre:\n\n• Manutenção de veículos\n• Otimização de rotas e entregas\n• Economia de combustível\n• Uso das ferramentas deste site\n• Suporte para situações comuns nas entregas\n\nPor favor, me conte mais sobre o que você precisa.',
                    'Bem-vindo ao chat de suporte! Estou aqui para ajudar com qualquer dúvida relacionada às suas entregas Shopee. Posso fornecer dicas sobre manutenção de veículos, economia de combustível, otimização de rotas ou uso das ferramentas deste site. Em que posso ajudar hoje?'
                ]);
        }
        
        console.log('Resposta gerada:', response);
        
        // Simular tempo de resposta da API (1-3 segundos)
        setTimeout(() => {
            // Remover indicador de digitação
            removeTypingIndicator();
            
            // Adicionar resposta ao chat
            addMessageToChat('bot', response);
            
            // Adicionar ao histórico
            messageHistory.push({ role: 'assistant', content: response });
            
            // Limitar histórico a 10 mensagens para não sobrecarregar
            if (messageHistory.length > 10) {
                messageHistory = messageHistory.slice(messageHistory.length - 10);
            }
        }, Math.random() * 2000 + 1000);
    }
    
    // Função para obter resposta aleatória de um array
    function getRandomResponse(responses) {
        return responses[Math.floor(Math.random() * responses.length)];
    }
});
