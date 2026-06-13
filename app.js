let chartInstance = null;

document.getElementById('btn-start').addEventListener('click', function() {
    const keyword = document.getElementById('keyword-input').value.trim();
    if (!keyword) {
        alert("Por favor, ingresa un tema o palabra clave.");
        return;
    }

    const btn = this;
    btn.disabled = true;
    btn.innerText = "Procesando...";

    // 1. Limpiar resultados anteriores
    document.querySelectorAll('.output-card').forEach(card => card.classList.remove('finished'));
    
    // 2. Definir la ruta exacta de la imagen
    const flowPath = [
        'step-trends',   // Búsqueda de tendencias
        'step-market',   // Datos de mercado
        'step-1',        // Escaneado
        'step-2',        // Estrategia
        'step-3',        // Fabricación
        'step-4',        // Análisis
        'step-5',        // Fase Sensor
        'step-portfolio',// Resultados: Portafolio
        'step-cms',      // Resultados: CMS
        'step-metrics'   // Resultados: Métricas
    ];

    let currentStep = 0;

    // 3. Simular el recorrido del agente
    const interval = setInterval(() => {
        // Apagar el paso anterior
        if (currentStep > 0) {
            document.getElementById(flowPath[currentStep - 1]).classList.remove('active-step');
        }

        // Si terminó el recorrido
        if (currentStep >= flowPath.length) {
            clearInterval(interval);
            btn.disabled = false;
            btn.innerText = "Iniciar Nuevo Flujo";
            return;
        }

        // Encender el paso actual
        const currentCard = document.getElementById(flowPath[currentStep]);
        currentCard.classList.add('active-step');

        // 4. Si llegamos a los pasos finales (Resultados), inyectar los datos simulados
        if (flowPath[currentStep] === 'step-portfolio') {
            currentCard.classList.add('finished');
            document.getElementById('res-portfolio').innerHTML = `
                <div class="content-box">
                    <strong>Título:</strong> El impacto de ${keyword} en el mercado actual.<br><br>
                    <strong>Extracto (Claude):</strong> Hemos analizado las tendencias recientes y ${keyword} se perfila como un pilar fundamental. En esta publicación, detallamos su evolución y proyecciones a corto plazo.
                </div>`;
        }

        if (flowPath[currentStep] === 'step-cms') {
            currentCard.classList.add('finished');
            document.getElementById('res-cms').innerText = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "${keyword} - Tendencias",
  "author": "Sistema Multiagente"
}
</script>`;
        }

        if (flowPath[currentStep] === 'step-metrics') {
            currentCard.classList.add('finished');
            renderChart(keyword);
        }

        currentStep++;
    }, 1000); // 1 segundo por cada paso
});

// Función para generar la gráfica en la última tarjeta
function renderChart(keyword) {
    const canvas = document.getElementById('trendChart');
    canvas.style.display = 'block';
    const ctx = canvas.getContext('2d');

    if (chartInstance) { chartInstance.destroy(); }

    // Generar datos aleatorios simulando tráfico
    const dataPoints = Array.from({length: 5}, () => Math.floor(Math.random() * 500) + 100);

    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5'],
            datasets: [{
                label: `Tráfico Orgánico Proyectado: ${keyword}`,
                data: dataPoints,
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 1
            }]
        },
        options: { responsive: true }
    });
}
