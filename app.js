// Referencias al DOM
const btnSimulate = document.getElementById('btn-simulate-anomaly');
const btnApprove = document.getElementById('btn-approve');
const btnReject = document.getElementById('btn-reject');

const amcTelemetry = document.getElementById('amc-telemetry');
const apsSops = document.getElementById('aps-sops');
const aadCodeDiff = document.getElementById('aad-code-diff');

const logAmc = document.getElementById('log-amc');
const logAps = document.getElementById('log-aps');
const logAad = document.getElementById('log-aad');

// Funciones de utilidad para logs
function addLog(element, message, color = "#0f0") {
    element.innerHTML += `<p style="color: ${color}">> ${message}</p>`;
    element.scrollTop = element.scrollHeight;
}

// 1. Simulación de detección del AMC
btnSimulate.addEventListener('click', () => {
    btnSimulate.disabled = true;
    
    // Simula telemetría
    amcTelemetry.innerHTML = `
        <li style="color: #ef4444;">LCP > 2.5s (Advertencia)</li>
        <li style="color: #ef4444;">Caída en SERP: Keyword "Arquitectura Multiagente" (-4 posiciones)</li>
        <li>Magnitud de desviación: Alta</li>
    `;
    
    addLog(logAmc, "Anomalía detectada. Calculando desviación estándar...", "#f59e0b");
    
    setTimeout(() => {
        addLog(logAmc, "Enviando JSON al APS (Sin juicios de valor).", "#3b82f6");
        triggerAPS();
    }, 1500);
});

// 2. Simulación de procesamiento del APS
function triggerAPS() {
    addLog(logAps, "JSON recibido desde AMC.", "#3b82f6");
    addLog(logAps, "Calculando distancia coseno respecto al centroide semántico...");
    
    setTimeout(() => {
        apsSops.innerHTML = `
            <li>Brecha de entidad detectada: Falta contexto sobre "Procedimientos Operativos Estándares".</li>
            <li>Inconsistencia de intención en la etiqueta &lt;title&gt;.</li>
            <li>Directriz: Actualizar Schema Markup (JSON-LD).</li>
        `;
        addLog(logAps, "SOPs semánticos generados. Escalando al AAD.", "#10b981");
        triggerAAD();
    }, 2000);
}

// 3. Simulación de actuación del AAD
function triggerAAD() {
    addLog(logAad, "SOPs recibidos desde APS.", "#3b82f6");
    addLog(logAad, "Traduciendo directrices a código técnico...");
    
    setTimeout(() => {
        aadCodeDiff.innerHTML = `// Corrección propuesta por AAD:
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "Arquitectura Multiagente Basada en SOP",
  "about": "Procedimientos Operativos Estándares"
}
</script>`;
        
        addLog(logAad, "Cambio de alto impacto generado. Requiere aprobación humana.", "#f59e0b");
        
        // Habilitar controles humanos
        btnApprove.disabled = false;
        btnReject.disabled = false;
    }, 2000);
}

// 4. Cierre del bucle cibernético
btnApprove.addEventListener('click', () => {
    btnApprove.disabled = true;
    btnReject.disabled = true;
    
    addLog(logAad, "Cambio aprobado por administrador.", "#10b981");
    addLog(logAad, "Inyectando código en CMS...");
    
    setTimeout(() => {
        addLog(logAad, "Notificando al AMC para reiniciar línea base (Cierre del bucle).", "#3b82f6");
        addLog(logAmc, "Notificación recibida. Reiniciando métricas a T=0.", "#10b981");
        
        amcTelemetry.innerHTML = `
            <li style="color: #10b981;">LCP estabilizado (1.8s)</li>
            <li style="color: #10b981;">SERP estabilizada.</li>
            <li>Monitoreo continuo activo...</li>
        `;
        
        btnSimulate.disabled = false;
        btnSimulate.innerText = "Simular Nueva Anomalía";
    }, 1500);
});

btnReject.addEventListener('click', () => {
    btnApprove.disabled = true;
    btnReject.disabled = true;
    addLog(logAad, "Cambio rechazado. Abortando operación.", "#ef4444");
    addLog(logAmc, "Esperando nuevas instrucciones...", "#ef4444");
    btnSimulate.disabled = false;
});
