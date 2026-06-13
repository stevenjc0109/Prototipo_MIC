let chartInstance = null;

document.getElementById('btn-start').addEventListener('click', function() {
    const keyword = document.getElementById('keyword-input').value.trim();
    if (!keyword) {
        alert("Por favor, ingresa un tema o palabra clave (Ej. Libros).");
        return;
    }

    const btn = this;
    btn.disabled = true;
    btn.innerText = "Procesando...";

    // Reiniciar textos
    document.getElementById('res-portfolio').innerText = "Procesando...";
    document.getElementById('res-cms').innerText = "Procesando...";
    document.getElementById('res-metrics').innerText = "Procesando...";
    document.getElementById('trendChart').style.display = 'none';

    // Ruta de IDs del HTML
    const flowPath = ['step-trends', 'step-market', 'step-1', 'step-2', 'step-3', 'step-4', 'step-5', 'step-portfolio', 'step-cms', 'step-metrics'];
    let currentStep = 0;

    const interval = setInterval(() => {
        // Apagar tarjeta anterior
        if (currentStep > 0) {
            document.getElementById(flowPath[currentStep - 1]).classList.remove('active-step');
        }

        // Si ya recorrió todo, detener animación y mostrar resultados
        if (currentStep >= flowPath.length) {
            clearInterval(interval);
            btn.disabled = false;
            btn.innerText = "Iniciar Nuevo Flujo";
            return;
        }

        // Encender tarjeta actual
        const currentCard = document.getElementById(flowPath[currentStep]);
        currentCard.classList.add('active-step');

        // Inyectar datos cuando llegue a la columna 3
        if (flowPath[currentStep] === 'step-portfolio') {
            document.getElementById('res-portfolio').innerHTML = `<strong>Tópico Analizado:</strong> ${keyword}<br><br><strong>Redacción (Claude):</strong> Hemos detectado un alto volumen de búsquedas para "${keyword}". Se ha generado un set de artículos e imágenes listos para publicar.`;
        }
        
        if (flowPath[currentStep] === 'step-cms') {
            document.getElementById('res-cms').innerText = `\n<title>Tendencias sobre ${keyword} en 2026</title>\n<meta name="robots" content="index, follow">`;
        }

        if (flowPath[currentStep] === 'step-metrics') {
            document.getElementById('res-metrics').style.display = 'none'; // ocultar texto de espera
            renderChart(keyword);
        }

        currentStep++;
    }, 800); // 800 milisegundos por paso
});

function renderChart(keyword) {
    const canvas = document.getElementById('trendChart');
    canvas.style.display = 'block';
    const ctx = canvas.getContext('2d');

    if (chartInstance) { chartInstance.destroy(); }

    const dataPoints = Array.from({length: 4}, () => Math.floor(Math.random() * 500) + 200);

    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
            datasets: [{
                label: `Tráfico Proyectado: ${keyword}`,
                data: dataPoints,
                backgroundColor: 'rgba(16, 185, 129, 0.5)',
                borderColor: 'rgba(16, 185, 129, 1)',
                borderWidth: 1
            }]
        },
        options: { responsive: true }
    });
}
