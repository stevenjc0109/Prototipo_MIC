document.getElementById('btn-start').addEventListener('click', function() {
    const button = this;
    button.disabled = true;
    button.innerText = "Simulando flujo...";

    // Obtener todos los elementos del flujo
    const steps = [
        document.getElementById('data-trends'),
        document.getElementById('data-market'),
        document.getElementById('step-1'),
        document.getElementById('step-2'),
        document.getElementById('step-3'),
        document.getElementById('step-4'),
        document.getElementById('step-5'),
        document.getElementById('out-portfolio'),
        document.getElementById('out-cms'),
        document.getElementById('out-metrics')
    ];

    const feedbackBar = document.getElementById('feedback-agi');

    // Reiniciar estilos
    steps.forEach(step => step.classList.remove('active-step'));
    feedbackBar.classList.remove('feedback-active');

    // Iluminar en secuencia para simular el proceso del agente
    let delay = 0;
    
    steps.forEach((step, index) => {
        setTimeout(() => {
            // Quitar el brillo del paso anterior
            if(index > 0) steps[index - 1].classList.remove('active-step');
            
            // Iluminar paso actual
            step.classList.add('active-step');
            
            // Comportamiento especial al llegar a métricas y retroalimentación
            if (index === steps.length - 1) {
                setTimeout(() => {
                    step.classList.remove('active-step');
                    feedbackBar.classList.add('feedback-active'); // Activa el bucle AGI
                    button.disabled = false;
                    button.innerText = "Iniciar Nuevo Flujo";
                }, 1500);
            }
        }, delay);
        
        delay += 1200; // 1.2 segundos por cada paso del diagrama
    });
});
