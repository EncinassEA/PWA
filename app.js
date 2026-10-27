// 1. Registro del Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(reg => console.log('Service Worker registrado', reg))
        .catch(err => console.warn('Error al registrar SW', err));
}

// 2. Controladores de Estado de Red (Online / Offline)
const offlineMessage = document.getElementById('offline-message');

window.addEventListener('offline', () => {
    offlineMessage.classList.remove('hidden');
});

window.addEventListener('online', () => {
    offlineMessage.classList.add('hidden');
});

// Comprobar el estado al cargar la página
if (!navigator.onLine) {
    offlineMessage.classList.remove('hidden');
}

// 3. Consumo de la WebAPI (Reemplaza la URL con la tuya de ASP.NET o FastAPI)
const apiUrl = 'https://TU_API_URL_AQUI.com/api/endpoint'; 
const dataContainer = document.getElementById('api-data-container');

async function fetchData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        // Suponiendo que tu API devuelve un arreglo de objetos (ej. productos de Dunaroma)
        data.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `Dato: ${item.nombre_o_propiedad}`; // Ajusta a la respuesta de tu API
            dataContainer.appendChild(li);
        });
    } catch (error) {
        console.error('Error al consumir la API:', error);
        dataContainer.innerHTML = '<li>No se pudieron cargar los datos (Revisa tu conexión).</li>';
    }
}

fetchData();