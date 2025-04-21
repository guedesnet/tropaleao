// Integração com Google Maps API
document.addEventListener('DOMContentLoaded', function() {
    // Variáveis globais para o mapa
    window.map = null;
    window.marker = null;
    
    // Inicializar o mapa
    window.initMap = function() {
        // Elementos do DOM
        const mapDiv = document.getElementById('map');
        
        if (!mapDiv) return;
        
        // Coordenadas iniciais (Rio de Janeiro)
        const initialPosition = { lat: -22.9068, lng: -43.1729 };
        
        // Criar mapa
        window.map = new google.maps.Map(mapDiv, {
            center: initialPosition,
            zoom: 15,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: true,
            styles: [
                {
                    "featureType": "poi",
                    "elementType": "labels",
                    "stylers": [{ "visibility": "off" }]
                }
            ]
        });
        
        // Criar marcador
        window.marker = new google.maps.Marker({
            position: initialPosition,
            map: window.map,
            title: 'Localização',
            animation: google.maps.Animation.DROP
        });
        
        console.log('Google Maps inicializado com sucesso');
    };
    
    // Função para buscar coordenadas de um endereço
    window.buscarCoordenadas = function(endereco) {
        if (!window.map || !window.marker) {
            console.error('Mapa não inicializado');
            return;
        }
        
        // Usando Geocoding API do Google Maps
        const geocoder = new google.maps.Geocoder();
        
        geocoder.geocode({ address: endereco }, function(results, status) {
            if (status === 'OK' && results[0]) {
                const location = results[0].geometry.location;
                
                console.log('Coordenadas encontradas:', location.lat(), location.lng());
                
                // Atualizar mapa
                window.map.setCenter(location);
                window.map.setZoom(16); // Zoom mais aproximado
                window.marker.setPosition(location);
                window.marker.setTitle(endereco);
                
                // Animação do marcador
                window.marker.setAnimation(google.maps.Animation.DROP);
                
                // Adicionar info window com o endereço
                const infoWindow = new google.maps.InfoWindow({
                    content: `<div style="font-weight:bold;">${endereco}</div>`
                });
                
                // Abrir info window ao clicar no marcador
                window.marker.addListener('click', function() {
                    infoWindow.open(window.map, window.marker);
                });
                
                // Abrir info window inicialmente
                infoWindow.open(window.map, window.marker);
            } else {
                console.error('Geocode falhou:', status);
                alert('Não foi possível localizar o endereço no mapa.');
            }
        });
    };
    
    // Verificar se o script do Google Maps já foi carregado
    if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
        console.log('Carregando script do Google Maps...');
        
        // Adicionar script do Google Maps ao final do body
        const script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&callback=initMap&v=weekly';
        script.defer = true;
        script.async = true;
        document.body.appendChild(script);
    } else {
        console.log('Google Maps já carregado');
        window.initMap();
    }
});
