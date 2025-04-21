// Implementação da funcionalidade de geração de PDF para rotas otimizadas
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se jsPDF está disponível, caso contrário, carregar dinamicamente
    if (typeof jsPDF === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        document.head.appendChild(script);
        
        const scriptAutoTable = document.createElement('script');
        scriptAutoTable.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js';
        document.head.appendChild(scriptAutoTable);
    }
    
    // Referência ao botão de gerar PDF
    const gerarPDFBtn = document.getElementById('gerarPDF');
    
    // Sobrescrever a função de gerar PDF quando o botão for clicado
    if (gerarPDFBtn) {
        gerarPDFBtn.addEventListener('click', function() {
            const dadosProcessados = window.dadosProcessados;
            
            if (!dadosProcessados || Object.keys(dadosProcessados).length === 0) {
                alert('Por favor, otimize a rota primeiro.');
                return;
            }
            
            // Alterar texto do botão para indicar processamento
            const textoOriginal = gerarPDFBtn.textContent;
            gerarPDFBtn.textContent = 'Gerando PDF...';
            gerarPDFBtn.disabled = true;
            
            // Gerar PDF após um pequeno delay para garantir que a UI seja atualizada
            setTimeout(() => {
                try {
                    gerarPDFReal(dadosProcessados);
                } catch (error) {
                    console.error('Erro ao gerar PDF:', error);
                    alert('Erro ao gerar PDF. Por favor, tente novamente.');
                } finally {
                    // Restaurar botão
                    gerarPDFBtn.textContent = textoOriginal;
                    gerarPDFBtn.disabled = false;
                }
            }, 100);
        });
    }
    
    // Função para gerar PDF real usando jsPDF
    function gerarPDFReal(dados) {
        // Verificar se jsPDF está disponível
        if (typeof jsPDF === 'undefined') {
            alert('Biblioteca de PDF ainda não carregada. Por favor, aguarde alguns segundos e tente novamente.');
            return;
        }
        
        // Criar novo documento PDF
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });
        
        // Configurações de cores
        const cores = [
            '#FFE0B2', '#FFCCBC', '#D7CCC8', '#C5CAE9', '#B3E5FC', 
            '#B2DFDB', '#DCEDC8', '#F0F4C3', '#FFECB3', '#FFE0B2',
            '#FFCCBC', '#D7CCC8', '#C5CAE9', '#B3E5FC', '#B2DFDB'
        ];
        
        // Adicionar título
        doc.setFontSize(18);
        doc.setTextColor('#FB641B'); // Cor laranja Shopee
        doc.text('ROTA OTIMIZADA - SUPORTE DOS CRIA', 105, 15, { align: 'center' });
        
        // Adicionar data e hora
        const dataHora = new Date().toLocaleString('pt-BR');
        doc.setFontSize(10);
        doc.setTextColor('#000000');
        doc.text(`Gerado em: ${dataHora}`, 105, 22, { align: 'center' });
        
        // Posição inicial
        let yPos = 30;
        let colorIndex = 0;
        
        // Para cada rua/endereço
        Object.keys(dados).sort().forEach(rua => {
            const pacotes = dados[rua];
            
            // Verificar se precisa de nova página
            if (yPos > 250) {
                doc.addPage();
                yPos = 20;
            }
            
            // Cor de fundo para o grupo
            const corHex = cores[colorIndex % cores.length];
            // Converter hex para RGB
            const r = parseInt(corHex.substring(1, 3), 16);
            const g = parseInt(corHex.substring(3, 5), 16);
            const b = parseInt(corHex.substring(5, 7), 16);
            
            // Desenhar retângulo colorido
            doc.setFillColor(r, g, b);
            doc.rect(10, yPos, 190, 10, 'F');
            
            // Adicionar nome da rua
            doc.setFontSize(12);
            doc.setTextColor('#000000');
            doc.setFont('helvetica', 'bold');
            doc.text(rua, 15, yPos + 7);
            
            yPos += 15;
            
            // Adicionar cada pacote
            pacotes.sort((a, b) => parseInt(a.sequencia) - parseInt(b.sequencia)).forEach(pacote => {
                // Verificar se precisa de nova página
                if (yPos > 270) {
                    doc.addPage();
                    yPos = 20;
                    
                    // Redesenhar cabeçalho da rua na nova página
                    doc.setFillColor(r, g, b);
                    doc.rect(10, yPos, 190, 10, 'F');
                    doc.setFontSize(12);
                    doc.setTextColor('#000000');
                    doc.setFont('helvetica', 'bold');
                    doc.text(`${rua} (continuação)`, 15, yPos + 7);
                    
                    yPos += 15;
                }
                
                // Desenhar fundo claro para o pacote
                doc.setFillColor(r, g, b, 0.3); // Versão mais clara da cor
                doc.rect(15, yPos - 5, 180, 15, 'F');
                
                // Adicionar informações do pacote
                doc.setFontSize(10);
                doc.setFont('helvetica', 'bold');
                doc.text(`Seq ${pacote.sequencia}: ${pacote.codigoPacote}`, 20, yPos + 2);
                
                doc.setFont('helvetica', 'normal');
                doc.text(pacote.endereco, 20, yPos + 8);
                
                yPos += 18;
            });
            
            // Espaço entre grupos
            yPos += 5;
            colorIndex++;
        });
        
        // Adicionar rodapé
        const totalPages = doc.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor('#666666');
            doc.text(`Página ${i} de ${totalPages} - SUPORTE DOS CRIA`, 105, 290, { align: 'center' });
        }
        
        // Salvar o PDF
        try {
            doc.save('rota_otimizada.pdf');
            alert('PDF gerado com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar PDF:', error);
            alert('Erro ao gerar PDF. Por favor, tente novamente.');
        }
    }
});
