// Implementação da funcionalidade de busca de CEP com integração real
document.addEventListener('DOMContentLoaded', function() {
    const cepInput = document.getElementById('cep');
    const buscarCepBtn = document.getElementById('buscarCep');
    const enderecoSpan = document.getElementById('endereco');
    const bairroSpan = document.getElementById('bairro');
    const cidadeUfSpan = document.getElementById('cidade-uf');
    const mapDiv = document.getElementById('map');
    
    let map;
    let marker;
    
    // Inicializar o mapa
    window.initMap = function() {
        // Coordenadas iniciais (Rio de Janeiro)
        const initialPosition = { lat: -22.9068, lng: -43.1729 };
        
        map = new google.maps.Map(mapDiv, {
            center: initialPosition,
            zoom: 15,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: true,
        });
        
        marker = new google.maps.Marker({
            position: initialPosition,
            map: map,
            title: 'Localização',
            animation: google.maps.Animation.DROP
        });
    };
    
    // Formatar CEP enquanto digita
    if (cepInput) {
        cepInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 5) {
                value = value.substring(0, 5) + '-' + value.substring(5, 8);
            }
            e.target.value = value;
        });
    }
    
    // Buscar CEP
    if (buscarCepBtn) {
        buscarCepBtn.addEventListener('click', buscarCEP);
    }
    
    // Buscar CEP ao pressionar Enter
    if (cepInput) {
        cepInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                buscarCEP();
            }
        });
    }
    
    function buscarCEP() {
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
                    throw new Error('Erro na requisição');
                }
                return response.json();
            })
            .then(data => {
                if (data.erro) {
                    throw new Error('CEP não encontrado');
                }
                
                // Preencher informações
                enderecoSpan.textContent = data.logradouro || 'Não disponível';
                bairroSpan.textContent = data.bairro || 'Não disponível';
                cidadeUfSpan.textContent = `${data.localidade || 'Não disponível'}/${data.uf || ''}`;
                
                // Buscar coordenadas para o endereço
                const endereco = `${data.logradouro}, ${data.bairro}, ${data.localidade}, ${data.uf}, ${data.cep}, Brasil`;
                buscarCoordenadas(endereco);
            })
            .catch(error => {
                console.error('Erro ao buscar CEP:', error);
                enderecoSpan.textContent = 'Não encontrado';
                bairroSpan.textContent = 'Não encontrado';
                cidadeUfSpan.textContent = 'Não encontrado';
                
                // Resetar mapa para posição inicial
                if (map && marker) {
                    const initialPosition = { lat: -22.9068, lng: -43.1729 };
                    map.setCenter(initialPosition);
                    marker.setPosition(initialPosition);
                }
                
                alert('CEP não encontrado ou erro na busca. Verifique o CEP e tente novamente.');
            })
            .finally(() => {
                // Restaurar texto do botão
                buscarCepBtn.textContent = 'Buscar CEP';
                buscarCepBtn.disabled = false;
            });
    }
    
    function buscarCoordenadas(endereco) {
        // Usando Geocoding API do Google Maps
        const geocoder = new google.maps.Geocoder();
        
        geocoder.geocode({ address: endereco }, function(results, status) {
            if (status === 'OK' && results[0]) {
                const location = results[0].geometry.location;
                
                // Atualizar mapa
                map.setCenter(location);
                map.setZoom(16); // Zoom mais aproximado
                marker.setPosition(location);
                marker.setTitle(endereco);
                
                // Animação do marcador
                marker.setAnimation(google.maps.Animation.DROP);
                
                // Adicionar info window com o endereço
                const infoWindow = new google.maps.InfoWindow({
                    content: `<div style="font-weight:bold;">${endereco}</div>`
                });
                
                // Abrir info window ao clicar no marcador
                marker.addListener('click', function() {
                    infoWindow.open(map, marker);
                });
                
                // Abrir info window inicialmente
                infoWindow.open(map, marker);
            } else {
                console.error('Geocode falhou:', status);
                alert('Não foi possível localizar o endereço no mapa.');
            }
        });
    }
    
    // Adicionar botão para usar localização atual como exemplo
    const exemploBtn = document.createElement('button');
    exemploBtn.textContent = 'Usar CEP de Exemplo';
    exemploBtn.className = 'btn btn-secondary';
    exemploBtn.style.marginLeft = '10px';
    
    if (buscarCepBtn && buscarCepBtn.parentNode) {
        buscarCepBtn.parentNode.appendChild(exemploBtn);
        
        exemploBtn.addEventListener('click', function() {
            // CEP de exemplo (Centro do Rio de Janeiro)
            cepInput.value = '20031-170';
            buscarCEP();
        });
    }
});
