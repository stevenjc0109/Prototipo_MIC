let myChart = null; // Variable para almacenar el gráfico

document.getElementById('btn-start').addEventListener('click', function() {
    const topic = document.getElementById('topic-input').value.trim();
    if (!topic) {
        alert("Por favor, ingresa una categoría primero.");
        return;
    }

    // Ocultar resultados previos y mostrar barra de carga
    document.getElementById('results-section').style.display = 'none';
    document.getElementById('agent-process').style.display = 'block';
    const progressBar = document.getElementById('progress-bar');
    const statusText = document.getElementById('agent-status');
    const btn = this;
    
    btn.disabled = true;
    progressBar.style.width = '0%';

    // Array simulando las etapas de tu diagrama
    const steps = [
        "Escaneado y Detección en Google Trends...",
        "Estrategia y Alineación SEO con Surfer SEO...",
        "Fabricación de Contenido: Generando redacción con Claude...",
        "Fabricación de Contenido: Optimizando etiquetas y generando Gráficos...",
        "Análisis completado. Evaluando fase de sensor..."
    ];

    let currentStep = 0;

    // Simulación del tiempo de procesamiento de la IA
    const interval = setInterval(() => {
        currentStep++;
        progressBar.style.width = (currentStep * 20) + '%';
        statusText.innerText = steps[currentStep - 1];

        if (currentStep >= 5) {
            clearInterval(interval);
            setTimeout(() => {
                showResults(topic);
                btn.disabled = false;
            }, 1000);
        }
    }, 1500); // 1.5 segundos por cada paso
});

function showResults(topic) {
    document.getElementById('agent-process').style.display = 'none';
    document.getElementById('results-section').style.display = 'block';

    // 1. Simular Redacción
    document.getElementById('gen-redaccion').innerHTML = `
        <strong>Título Propuesto:</strong> Todo lo que necesitas saber sobre ${topic} en 2026.<br><br>
        <strong>Introducción:</strong> El mundo de <em>${topic}</em> está evolucionando rápidamente. 
        Según nuestros datos de escaneo, la demanda de información clara y estructurada sobre este tema 
        ha crecido. En este artículo, exploraremos las tendencias actuales, los mejores consejos y cómo 
        aprovechar al máximo las herramientas disponibles en el mercado.
    `;

    // 2. Simular Optimización Técnica SEO
    document.getElementById('gen-seo').innerText = `
<title>Guía Definitiva sobre ${topic} | Tendencias 2026</title>
<meta name="description" content="Descubre el análisis completo sobre ${topic}. Aprende estrategias, revisa gráficos y mejora tu posicionamiento.">
<meta name="keywords" content="${topic}, tendencias ${topic}, optimización, novedades">

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Guía sobre ${topic}"
}
</script>
    `;

    // 3. Simular Gráficos (Tendencia) - Usando Chart.js
    const isTrending = Math.random() > 0.3; // 70% probabilidad de ser tendencia
    const trendEl = document.getElementById('trend-status');
    
    if (isTrending) {
        trendEl.innerText = `🔥 "${topic}" está en TENDENCIA ALTA`;
        trendEl.className = 'trend-status trend-high';
    } else {
        trendEl.innerText = `📉 "${topic}" tiene un volumen ESTABLE/BAJO`;
        trendEl.className = 'trend-status trend-low';
    }

    // Generar datos aleatorios para el gráfico
    const dataPoints = Array.from({length: 6}, () => Math.floor(Math.random() * 100));
    
    // Destruir gráfico anterior si existe para evitar superposiciones
    if (myChart) { myChart.destroy(); }
    
    const ctx = document.getElementById('trendChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
            datasets: [{
                label: `Volumen de Búsqueda: ${topic}`,
                data: dataPoints,
                borderColor: isTrending ? '#10b981' : '#f59e0b',
                backgroundColor: isTrending ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: { responsive: true }
    });

    // 4. Simular Imagen Generada
    const imgPlaceholder = document.getElementById('gen-imagen');
    imgPlaceholder.innerHTML = `<span style="background: rgba(255,255,255,0.8); padding: 5px; border-radius: 5px;">Imagen de portada para: ${topic}</span>`;
    // Asignamos una imagen genérica de Unsplash basada en la palabra clave
    imgPlaceholder.style.backgroundImage = `url('https://source.unsplash.com/600x400/?${encodeURIComponent(topic)}')`;
}

// Botón de reset (Bucle de Retroalimentación)
document.getElementById('btn-reset').addEventListener('click', function() {
    document.getElementById('results-section').style.display = 'none';
    document.getElementById('topic-input').value = '';
    document.getElementById('topic-input').focus();
});
