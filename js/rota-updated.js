// Implementação atualizada da funcionalidade de otimização de rota com dados reais
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const dadosRotaTextarea = document.getElementById('dados-rota');
    const otimizarRotaBtn = document.getElementById('otimizarRota');
    const gerarPDFBtn = document.getElementById('gerarPDF');
    const compartilharWhatsAppBtn = document.getElementById('compartilharWhatsApp');
    const limparDadosBtn = document.createElement('button');
    const uploadPlanilhaBtn = document.createElement('button');
    const rotaOtimizadaDiv = document.getElementById('rota-otimizada');
    const fileInput = document.createElement('input');
    
    // Dados processados
    let dadosProcessados = null;
    let pdfUrl = null;
    
    // Cores para diferentes endereços
    const cores = [
        '#FFE0B2', '#FFCCBC', '#D7CCC8', '#C5CAE9', '#B3E5FC', 
        '#B2DFDB', '#DCEDC8', '#F0F4C3', '#FFECB3', '#FFE0B2',
        '#FFCCBC', '#D7CCC8', '#C5CAE9', '#B3E5FC', '#B2DFDB'
    ];
    
    // Configurar botão de limpar dados
    limparDadosBtn.textContent = 'Limpar Dados';
    limparDadosBtn.className = 'btn btn-danger';
    limparDadosBtn.style.marginLeft = '10px';
    
    // Configurar botão de upload de planilha
    uploadPlanilhaBtn.textContent = 'Upload Planilha';
    uploadPlanilhaBtn.className = 'btn btn-secondary';
    uploadPlanilhaBtn.style.marginLeft = '10px';
    
    // Configurar input de arquivo (oculto)
    fileInput.type = 'file';
    fileInput.accept = '.xlsx,.xls,.csv,.txt';
    fileInput.style.display = 'none';
    
    // Adicionar botões ao DOM
    if (otimizarRotaBtn && otimizarRotaBtn.parentNode) {
        otimizarRotaBtn.parentNode.appendChild(limparDadosBtn);
        otimizarRotaBtn.parentNode.appendChild(uploadPlanilhaBtn);
        document.body.appendChild(fileInput);
    }
    
    // Adicionar eventos aos botões
    if (otimizarRotaBtn) {
        otimizarRotaBtn.addEventListener('click', otimizarRota);
    }
    
    if (gerarPDFBtn) {
        gerarPDFBtn.addEventListener('click', gerarPDF);
    }
    
    if (compartilharWhatsAppBtn) {
        compartilharWhatsAppBtn.addEventListener('click', compartilharWhatsApp);
    }
    
    limparDadosBtn.addEventListener('click', limparDados);
    uploadPlanilhaBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFileUpload);
    
    // Função para limpar dados
    function limparDados() {
        dadosRotaTextarea.value = '';
        rotaOtimizadaDiv.innerHTML = '';
        dadosProcessados = null;
        gerarPDFBtn.disabled = true;
        compartilharWhatsAppBtn.disabled = true;
    }
    
    // Função para lidar com upload de arquivo
    function handleFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        
        reader.onload = function(e) {
            dadosRotaTextarea.value = e.target.result;
            // Resetar o input para permitir selecionar o mesmo arquivo novamente
            fileInput.value = '';
        };
        
        reader.onerror = function() {
            alert('Erro ao ler o arquivo. Tente novamente.');
            fileInput.value = '';
        };
        
        // Ler como texto
        reader.readAsText(file);
    }
    
    // Função para otimizar rota
    function otimizarRota() {
        const dadosTexto = dadosRotaTextarea.value.trim();
        
        if (!dadosTexto) {
            alert('Por favor, cole os dados da planilha de rotas ou faça upload do arquivo.');
            return;
        }
        
        try {
            // Processar os dados
            dadosProcessados = processarDadosRota(dadosTexto);
            
            // Exibir resultados
            exibirRotaOtimizada(dadosProcessados);
            
            // Habilitar botões
            gerarPDFBtn.disabled = false;
            compartilharWhatsAppBtn.disabled = false;
            
        } catch (error) {
            console.error('Erro ao processar dados:', error);
            alert('Erro ao processar os dados. Verifique se o formato está correto.');
        }
    }
    
    // Função para processar dados da rota
    function processarDadosRota(dadosTexto) {
        // Dividir o texto em linhas
        const linhas = dadosTexto.split('\n').filter(linha => linha.trim());
        
        // Estrutura para armazenar os dados processados
        const enderecos = {};
        const ruasNormalizadas = {}; // Para mapear nomes de ruas similares
        
        // Expressões regulares para identificar colunas
        const regexSequence = /^(\d+)$/;
        const regexSPXTN = /^(BR\d+[A-Z0-9]+)$/;
        const regexEndereco = /^(R\.?|Rua|Av\.?|Avenida|Tv\.?|Travessa|Est\.?|Estrada|Cam\.?|Caminho|Praça|Alameda)/i;
        
        // Processar cada linha
        linhas.forEach(linha => {
            // Dividir a linha em colunas (assumindo separação por tabs ou múltiplos espaços)
            const colunas = linha.split(/\t|\s{2,}/).filter(col => col.trim());
            
            // Verificar se temos colunas suficientes
            if (colunas.length < 3) return;
            
            // Variáveis para armazenar os dados extraídos
            let sequencia = null;
            let codigoPacote = null;
            let endereco = null;
            let stop = null;
            
            // Tentar identificar as colunas
            for (let i = 0; i < colunas.length; i++) {
                const coluna = colunas[i].trim();
                
                // Verificar se é um número (sequência)
                if (sequencia === null && regexSequence.test(coluna)) {
                    sequencia = coluna;
                    // Verificar se a próxima coluna também é um número (pode ser o stop)
                    if (i + 1 < colunas.length && regexSequence.test(colunas[i + 1].trim())) {
                        stop = colunas[i + 1].trim();
                    }
                }
                // Verificar se é um código de pacote (BR seguido de números e letras)
                else if (codigoPacote === null && regexSPXTN.test(coluna)) {
                    codigoPacote = coluna;
                }
                // Se já temos sequência e código, verificar se é início de endereço
                else if (sequencia !== null && codigoPacote !== null && endereco === null && regexEndereco.test(coluna)) {
                    // Pegar o resto da linha como endereço
                    endereco = colunas.slice(i).join(' ').trim();
                    break;
                }
            }
            
            // Se não conseguimos identificar todas as informações, tentar outro método
            if (sequencia === null || codigoPacote === null || endereco === null) {
                // Tentar identificar por posição (assumindo formato da planilha fornecida)
                if (colunas.length >= 5) {
                    // Formato da planilha: AT ID | Sequence | Stop | SPX TN | Destination Address
                    sequencia = colunas[1];
                    stop = colunas[2];
                    codigoPacote = colunas[3];
                    endereco = colunas.slice(4).join(' ').trim();
                }
            }
            
            // Se ainda não conseguimos, pular esta linha
            if (sequencia === null || codigoPacote === null || endereco === null) return;
            
            // Extrair a rua principal e número (se disponível)
            let ruaPrincipal = endereco;
            let numeroEndereco = '';
            
            // Tentar extrair até a vírgula
            if (endereco.includes(',')) {
                const partes = endereco.split(',');
                ruaPrincipal = partes[0].trim();
                
                // Tentar extrair número do endereço
                const matchNumero = ruaPrincipal.match(/\s+(\d+\w*)\s*$/);
                if (matchNumero) {
                    numeroEndereco = matchNumero[1];
                    ruaPrincipal = ruaPrincipal.replace(/\s+\d+\w*\s*$/, '');
                } else {
                    // Tentar extrair número da segunda parte (após a vírgula)
                    const matchNumeroSegundaParte = partes[1].trim().match(/^(\d+\w*)\s*/);
                    if (matchNumeroSegundaParte) {
                        numeroEndereco = matchNumeroSegundaParte[1];
                    }
                }
            } else {
                // Tentar extrair número (ex: "Rua Nome 123" -> "Rua Nome" e "123")
                const match = endereco.match(/^(.*?)\s+(\d+\w*)\s*$/);
                if (match) {
                    ruaPrincipal = match[1].trim();
                    numeroEndereco = match[2];
                }
            }
            
            // Normalizar nome da rua para agrupar endereços similares
            let ruaNormalizada = ruaPrincipal.toLowerCase()
                .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Remover acentos
                .replace(/^(r\.?|rua|av\.?|avenida|tv\.?|travessa|est\.?|estrada|cam\.?|caminho|praça|alameda)\s+/i, '')
                .replace(/\s+/g, ' ')
                .trim();
            
            // Verificar se esta rua é similar a alguma já processada
            let ruaChave = null;
            for (const [chave, valor] of Object.entries(ruasNormalizadas)) {
                // Verificar similaridade usando distância de Levenshtein ou outra métrica
                if (similaridade(ruaNormalizada, valor) > 0.8) {
                    ruaChave = chave;
                    break;
                }
            }
            
            // Se não encontrou rua similar, criar nova entrada
            if (ruaChave === null) {
                ruaChave = ruaPrincipal;
                ruasNormalizadas[ruaChave] = ruaNormalizada;
            }
            
            // Adicionar à estrutura de dados
            if (!enderecos[ruaChave]) {
                enderecos[ruaChave] = [];
            }
            
            enderecos[ruaChave].push({
                sequencia,
                stop,
                codigoPacote,
                endereco,
                numeroEndereco
            });
        });
        
        return enderecos;
    }
    
    // Função para calcular similaridade entre strings (0-1)
    function similaridade(s1, s2) {
        // Implementação simples da distância de Levenshtein normalizada
        const track = Array(s2.length + 1).fill(null).map(() => 
            Array(s1.length + 1).fill(null));
        
        for (let i = 0; i <= s1.length; i += 1) {
            track[0][i] = i;
        }
        
        for (let j = 0; j <= s2.length; j += 1) {
            track[j][0] = j;
        }
        
        for (let j = 1; j <= s2.length; j += 1) {
            for (let i = 1; i <= s1.length; i += 1) {
                const indicator = s1[i - 1] === s2[j - 1] ? 0 : 1;
                track[j][i] = Math.min(
                    track[j][i - 1] + 1, // deletion
                    track[j - 1][i] + 1, // insertion
                    track[j - 1][i - 1] + indicator // substitution
                );
            }
        }
        
        const maxLength = Math.max(s1.length, s2.length);
        if (maxLength === 0) return 1.0; // Ambas strings vazias são 100% similares
        
        return 1.0 - (track[s2.length][s1.length] / maxLength);
    }
    
    // Função para exibir a rota otimizada
    function exibirRotaOtimizada(dados) {
        if (!rotaOtimizadaDiv) return;
        
        // Limpar conteúdo anterior
        rotaOtimizadaDiv.innerHTML = '';
        
        // Verificar se temos dados
        if (Object.keys(dados).length === 0) {
            rotaOtimizadaDiv.innerHTML = '<p>Nenhum dado encontrado para otimização.</p>';
            return;
        }
        
        // Criar elementos para cada grupo de endereços
        let colorIndex = 0;
        const coresUsadas = {}; // Para rastrear cores por rua normalizada
        
        Object.keys(dados).sort().forEach(rua => {
            const pacotes = dados[rua];
            
            // Criar container para o grupo
            const grupoDiv = document.createElement('div');
            grupoDiv.className = 'rota-grupo';
            
            // Usar a mesma cor para ruas similares
            if (!coresUsadas[rua]) {
                coresUsadas[rua] = cores[colorIndex % cores.length];
                colorIndex++;
            }
            
            grupoDiv.style.backgroundColor = coresUsadas[rua];
            
            // Criar cabeçalho com o nome da rua
            const ruaDiv = document.createElement('div');
            ruaDiv.className = 'rota-endereco';
            ruaDiv.innerHTML = `🛣️ ${rua}`;
            grupoDiv.appendChild(ruaDiv);
            
            // Agrupar pacotes por número de endereço
            const pacotesPorNumero = {};
            
            pacotes.forEach(pacote => {
                const numero = pacote.numeroEndereco || 'S/N';
                if (!pacotesPorNumero[numero]) {
                    pacotesPorNumero[numero] = [];
                }
                pacotesPorNumero[numero].push(pacote);
            });
            
            // Adicionar cada grupo de pacotes por número
            Object.keys(pacotesPorNumero).sort((a, b) => {
                // Ordenar numericamente se possível
                const numA = parseInt(a);
                const numB = parseInt(b);
                if (!isNaN(numA) && !isNaN(numB)) {
                    return numA - numB;
                }
                return a.localeCompare(b);
            }).forEach(numero => {
                const pacotesNumero = pacotesPorNumero[numero];
                
                // Criar div para o número
                const numeroDiv = document.createElement('div');
                numeroDiv.className = 'rota-numero';
                
                // Obter complemento do endereço (após a vírgula)
                let complemento = '';
                if (pacotesNumero[0].endereco.includes(',')) {
                    const partes = pacotesNumero[0].endereco.split(',');
                    if (partes.length > 1) {
                        complemento = partes.slice(1).join(',').trim();
                    }
                }
                
                numeroDiv.innerHTML = `<strong>${numero}</strong>${complemento ? `, ${complemento}` : ''}`;
                grupoDiv.appendChild(numeroDiv);
                
                // Criar div para os pacotes deste número
                const pacotesDiv = document.createElement('div');
                pacotesDiv.className = 'rota-pacotes-numero';
                
                // Adicionar cada pacote
                pacotesDiv.innerHTML = `<strong>📦 Pacotes:</strong> ${pacotesNumero.map(p => p.sequencia).join(', ')}`;
                grupoDiv.appendChild(pacotesDiv);
            });
            
            // Adicionar total de pacotes
            const totalDiv = document.createElement('div');
            totalDiv.className = 'rota-total';
            totalDiv.innerHTML = `<strong>🧾 ${pacotes.length} pacote${pacotes.length !== 1 ? 's' : ''} nesse endereço</strong>`;
            grupoDiv.appendChild(totalDiv);
            
            // Adicionar grupo ao container principal
            rotaOtimizadaDiv.appendChild(grupoDiv);
        });
        
        // Rolar para o resultado
        rotaOtimizadaDiv.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Função para gerar PDF
    function gerarPDF() {
        if (!dadosProcessados) {
            alert('Por favor, otimize a rota primeiro.');
            return;
        }
        
        // Alterar texto do botão para indicar processamento
        const textoOriginal = gerarPDFBtn.textContent;
        gerarPDFBtn.textContent = 'Gerando PDF...';
        gerarPDFBtn.disabled = true;
        
        try {
            // Criar um novo documento PDF
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            // Configurações
            const margemEsquerda = 15;
            const margemTopo = 15;
            let posicaoY = margemTopo;
            
            // Título
            doc.setFontSize(16);
            doc.setTextColor(251, 100, 27); // Laranja Shopee
            doc.text('ROTA OTIMIZADA', doc.internal.pageSize.getWidth() / 2, posicaoY, { align: 'center' });
            posicaoY += 10;
            
            // Data e hora
            doc.setFontSize(10);
            doc.setTextColor(0, 0, 0);
            const dataHora = new Date().toLocaleString('pt-BR');
            doc.text(`Gerado em: ${dataHora}`, doc.internal.pageSize.getWidth() / 2, posicaoY, { align: 'center' });
            posicaoY += 15;
            
            // Cores para diferentes endereços
            let colorIndex = 0;
            const coresUsadas = {};
            
            // Processar cada rua
            Object.keys(dadosProcessados).sort().forEach(rua => {
                const pacotes = dadosProcessados[rua];
                
                // Verificar se precisa adicionar nova página
                if (posicaoY > doc.internal.pageSize.getHeight() - 30) {
                    doc.addPage();
                    posicaoY = margemTopo;
                }
                
                // Usar a mesma cor para ruas similares
                if (!coresUsadas[rua]) {
                    coresUsadas[rua] = colorIndex % cores.length;
                    colorIndex++;
                }
                
                // Converter cor hex para RGB
                const corHex = cores[coresUsadas[rua]];
                const r = parseInt(corHex.substring(1, 3), 16);
                const g = parseInt(corHex.substring(3, 5), 16);
                const b = parseInt(corHex.substring(5, 7), 16);
                
                // Adicionar retângulo colorido
                doc.setFillColor(r, g, b);
                doc.rect(margemEsquerda - 5, posicaoY - 5, doc.internal.pageSize.getWidth() - 2 * (margemEsquerda - 5), 10, 'F');
                
                // Nome da rua
                doc.setFontSize(12);
                doc.setTextColor(0, 0, 0);
                doc.text(`🛣️ ${rua}`, margemEsquerda, posicaoY);
                posicaoY += 10;
                
                // Agrupar pacotes por número de endereço
                const pacotesPorNumero = {};
                
                pacotes.forEach(pacote => {
                    const numero = pacote.numeroEndereco || 'S/N';
                    if (!pacotesPorNumero[numero]) {
                        pacotesPorNumero[numero] = [];
                    }
                    pacotesPorNumero[numero].push(pacote);
                });
                
                // Adicionar cada grupo de pacotes por número
                Object.keys(pacotesPorNumero).sort((a, b) => {
                    // Ordenar numericamente se possível
                    const numA = parseInt(a);
                    const numB = parseInt(b);
                    if (!isNaN(numA) && !isNaN(numB)) {
                        return numA - numB;
                    }
                    return a.localeCompare(b);
                }).forEach(numero => {
                    const pacotesNumero = pacotesPorNumero[numero];
                    
                    // Verificar se precisa adicionar nova página
                    if (posicaoY > doc.internal.pageSize.getHeight() - 30) {
                        doc.addPage();
                        posicaoY = margemTopo;
                    }
                    
                    // Obter complemento do endereço (após a vírgula)
                    let complemento = '';
                    if (pacotesNumero[0].endereco.includes(',')) {
                        const partes = pacotesNumero[0].endereco.split(',');
                        if (partes.length > 1) {
                            complemento = partes.slice(1).join(',').trim();
                        }
                    }
                    
                    // Número e complemento
                    doc.setFontSize(11);
                    doc.text(`${numero}${complemento ? `, ${complemento}` : ''}`, margemEsquerda + 5, posicaoY);
                    posicaoY += 5;
                    
                    // Pacotes
                    doc.setFontSize(10);
                    doc.text(`📦 Pacotes: ${pacotesNumero.map(p => p.sequencia).join(', ')}`, margemEsquerda + 10, posicaoY);
                    posicaoY += 7;
                });
                
                // Total de pacotes
                doc.setFontSize(10);
                doc.text(`🧾 ${pacotes.length} pacote${pacotes.length !== 1 ? 's' : ''} nesse endereço`, margemEsquerda + 5, posicaoY);
                posicaoY += 15;
            });
            
            // Rodapé
            doc.setFontSize(8);
            doc.text('Gerado por SUPORTE DOS CRIA', doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.getHeight() - 10, { align: 'center' });
            
            // Salvar o PDF
            pdfUrl = 'rota_otimizada.pdf';
            doc.save(pdfUrl);
            
            // Restaurar botão
            gerarPDFBtn.textContent = textoOriginal;
            gerarPDFBtn.disabled = false;
            
        } catch (error) {
            console.error('Erro ao gerar PDF:', error);
            alert('Erro ao gerar PDF. Verifique o console para mais detalhes.');
            
            // Restaurar botão
            gerarPDFBtn.textContent = textoOriginal;
            gerarPDFBtn.disabled = false;
        }
    }
    
    // Função para compartilhar via WhatsApp
    function compartilharWhatsApp() {
        if (!dadosProcessados) {
            alert('Por favor, otimize a rota primeiro.');
            return;
        }
        
        // Criar mensagem formatada no novo formato solicitado
        let mensagem = '🚚 *ROTA OTIMIZADA* 🚚\n\n';
        
        Object.keys(dadosProcessados).sort().forEach(rua => {
            const pacotes = dadosProcessados[rua];
            
            mensagem += `🛣️ ${rua}\n\n`;
            
            // Agrupar pacotes por número de endereço
            const pacotesPorNumero = {};
            
            pacotes.forEach(pacote => {
                const numero = pacote.numeroEndereco || 'S/N';
                if (!pacotesPorNumero[numero]) {
                    pacotesPorNumero[numero] = [];
                }
                pacotesPorNumero[numero].push(pacote);
            });
            
            // Adicionar cada grupo de pacotes por número
            Object.keys(pacotesPorNumero).sort((a, b) => {
                // Ordenar numericamente se possível
                const numA = parseInt(a);
                const numB = parseInt(b);
                if (!isNaN(numA) && !isNaN(numB)) {
                    return numA - numB;
                }
                return a.localeCompare(b);
            }).forEach(numero => {
                const pacotesNumero = pacotesPorNumero[numero];
                
                // Obter complemento do endereço (após a vírgula)
                let complemento = '';
                if (pacotesNumero[0].endereco.includes(',')) {
                    const partes = pacotesNumero[0].endereco.split(',');
                    if (partes.length > 1) {
                        complemento = partes.slice(1).join(',').trim();
                    }
                }
                
                mensagem += `📦 Pacotes: ${pacotesNumero.map(p => p.sequencia).join(', ')}\n`;
                mensagem += `${numero}${complemento ? `, ${complemento}` : ''}\n\n`;
            });
            
            mensagem += `🧾 ${pacotes.length} pacote${pacotes.length !== 1 ? 's' : ''} nesse endereço\n\n`;
        });
        
        // Adicionar rodapé
        mensagem += '🔧 Gerado por SUPORTE DOS CRIA';
        
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
    
    // Adicionar exemplo de dados da planilha
    const exemploBtn = document.createElement('button');
    exemploBtn.textContent = 'Carregar Exemplo';
    exemploBtn.className = 'btn btn-secondary';
    exemploBtn.style.marginBottom = '10px';
    
    if (dadosRotaTextarea && dadosRotaTextarea.parentNode) {
        dadosRotaTextarea.parentNode.insertBefore(exemploBtn, dadosRotaTextarea);
        
        exemploBtn.addEventListener('click', function() {
            // Exemplo baseado na planilha fornecida
            dadosRotaTextarea.value = `AT202504182EZ5C	1	1	BR2564064969935	Rua Campeiro Mor, 79, LOJA NÃO ABRE AOS SÁBADOS	Santa Cruz	Rio de Janeiro	23555-041
AT202504182EZ5C	2	1	BR256854162784A	Rua Campeiro Mor, 85	Santa Cruz	Rio de Janeiro	23555-041
AT202504182EZ5C	3	1	BR254611731645U	Rua Campeiro Mor, 111, Portão branco de alumínio	Santa Cruz	Rio de Janeiro	23555-041
AT202504182EZ5C	4	2	BR253127090059H	Travessa Isauto de Macedo, 27, Casa b	Santa Cruz	Rio de Janeiro	23555-042
AT202504182EZ5C	6	3	BR254602894059D	Travessa Isauto de Macedo, 11, Mercearia do Eneias	Santa Cruz	Rio de Janeiro	23555-042
AT202504182EZ5C	7	3	BR258239279723Z	Travessa Isauto de Macedo, 137, Próximo ao bar do tainha	Santa Cruz	Rio de Janeiro	23555-042
AT202504182EZ5C	8	4	BR255351894351P	Rua Johnny Alf, 08A, Casa do muro amarelo / cajueir	Santa Cruz	Rio de Janeiro	23555-040
AT202504182EZ5C	9	4	BR2591426801213	Rua Johnny Alf, 40, Beco 40 casa 4	Santa Cruz	Rio de Janeiro	23555-040
AT202504182EZ5C	10	5	BR257661440381O	Estrada do Ita, 16, Ao lado do muro azul	Santa Cruz	Rio de Janeiro	23555-053
AT202504182EZ5C	11	5	BR256928440497K	Caminho Margem do Rio Ita, 26	Santa Cruz	Rio de Janeiro	23555-095
AT202504182EZ5C	12	5	BR256928440497K	Caminho Margem do Rio Ita, 26	Santa Cruz	Rio de Janeiro	23555-095
AT202504182EZ5C	13	5	BR256928440497K	Caminho Margem do Rio Ita, 26	Santa Cruz	Rio de Janeiro	23555-095
AT202504182EZ5C	14	5	BR256928440497K	Caminho Margem do Rio Ita, 26	Santa Cruz	Rio de Janeiro	23555-095
AT202504182EZ5C	18	6	BR256928440497K	Caminho Margem do Rio Ita, 163	Santa Cruz	Rio de Janeiro	23555-095
AT202504182EZ5C	53	7	BR256928440497K	Caminho Margem do Rio Ita, 507	Santa Cruz	Rio de Janeiro	23555-095
AT202504182EZ5C	54	8	BR256928440497K	Caminho Margem do Rio Ita, 129, Depois do Campo da Juventude	Santa Cruz	Rio de Janeiro	23555-095`;
        });
    }
    
    // Adicionar instruções de uso
    const instrucoes = document.createElement('div');
    instrucoes.className = 'instrucoes-rota';
    instrucoes.innerHTML = `
        <h4>Como usar a otimização de rota:</h4>
        <ol>
            <li>Cole os dados da planilha no campo acima ou faça upload do arquivo</li>
            <li>Clique em "Otimizar Rota" para agrupar os endereços</li>
            <li>Use "Gerar PDF" para baixar a rota otimizada</li>
            <li>Use "Compartilhar via WhatsApp" para enviar a rota</li>
        </ol>
        <p><strong>Dica:</strong> Endereços similares serão agrupados com a mesma cor para facilitar a visualização.</p>
    `;
    
    if (rotaOtimizadaDiv && rotaOtimizadaDiv.parentNode) {
        rotaOtimizadaDiv.parentNode.insertBefore(instrucoes, rotaOtimizadaDiv);
    }
    
    // Adicionar estilo para os novos elementos
    const style = document.createElement('style');
    style.textContent = `
        .rota-grupo {
            margin-bottom: 20px;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .rota-endereco {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
            border-bottom: 1px solid rgba(0,0,0,0.1);
            padding-bottom: 5px;
        }
        .rota-numero {
            margin-top: 10px;
            font-size: 16px;
        }
        .rota-pacotes-numero {
            margin-left: 15px;
            margin-top: 5px;
        }
        .rota-total {
            margin-top: 10px;
            font-style: italic;
            text-align: right;
        }
        .instrucoes-rota {
            margin-bottom: 20px;
            padding: 15px;
            background-color: #f8f9fa;
            border-radius: 8px;
            border-left: 4px solid #FB641B;
        }
    `;
    document.head.appendChild(style);
});
