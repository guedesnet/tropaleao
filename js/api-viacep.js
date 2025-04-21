// Integração com API ViaCEP
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se a função de busca de CEP já existe
    if (typeof window.buscarCEP !== 'function') {
        // Elementos do DOM
        const cepInput = document.getElementById('cep');
        const buscarCepBtn = document.getElementById('buscarCep');
        const enderecoSpan = document.getElementById('endereco');
        const bairroSpan = document.getElementById('bairro');
        const cidadeUfSpan = document.getElementById('cidade-uf');
        
        // Função para buscar CEP na API ViaCEP
        window.buscarCEP = function() {
            const cep = cepInput.value.replace(/\D/g, '');
            
            if (cep.length !== 8) {
                alert('Por favor, digite um CEP válido com 8 dígitos.');
                return;
            }
            
            // Alterar texto do botão para indicar carregamento
            buscarCepBtn.textContent = 'Buscando...';
            buscarCepBtn.disabled = true;
            
            // Fazer requisição à API ViaCEP
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro na requisição à API ViaCEP');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Resposta da API ViaCEP:', data);
                    
                    if (data.erro) {
                        throw new Error('CEP não encontrado');
                    }
                    
                    // Preencher informações
                    enderecoSpan.textContent = data.logradouro || 'Não disponível';
                    bairroSpan.textContent = data.bairro || 'Não disponível';
                    cidadeUfSpan.textContent = `${data.localidade || 'Não disponível'}/${data.uf || ''}`;
                    
                    // Buscar coordenadas para o endereço
                    const endereco = `${data.logradouro}, ${data.bairro}, ${data.localidade}, ${data.uf}, ${data.cep}, Brasil`;
                    window.buscarCoordenadas(endereco);
                    
                    // Registrar sucesso
                    console.log('CEP encontrado com sucesso:', data);
                })
                .catch(error => {
                    console.error('Erro ao buscar CEP:', error);
                    enderecoSpan.textContent = 'Não encontrado';
                    bairroSpan.textContent = 'Não encontrado';
                    cidadeUfSpan.textContent = 'Não encontrado';
                    
                    // Resetar mapa para posição inicial
                    if (window.map && window.marker) {
                        const initialPosition = { lat: -22.9068, lng: -43.1729 };
                        window.map.setCenter(initialPosition);
                        window.marker.setPosition(initialPosition);
                    }
                    
                    alert('CEP não encontrado ou erro na busca. Verifique o CEP e tente novamente.');
                })
                .finally(() => {
                    // Restaurar texto do botão
                    buscarCepBtn.textContent = 'Buscar CEP';
                    buscarCepBtn.disabled = false;
                });
        };
        
        // Adicionar eventos
        if (buscarCepBtn) {
            buscarCepBtn.addEventListener('click', window.buscarCEP);
        }
        
        if (cepInput) {
            cepInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    window.buscarCEP();
                }
            });
        }
    }
});
