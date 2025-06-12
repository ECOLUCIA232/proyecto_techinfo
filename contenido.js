document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const encuestaForm = document.getElementById('encuestaForm');
    const btnLimpiar = document.getElementById('btnLimpiar');
    const btnEnviar = document.getElementById('btnEnviar');
    const resultadoContainer = document.getElementById('resultado');
    const btnVerResultados = document.getElementById('btnVerResultados');
    const progressFill = document.getElementById('progressFill');
    const contador = document.getElementById('contador');
    const tipoEnergiaGroup = document.getElementById('tipo-energia-group');
    
    // Ocultar grupo de tipos de energía inicialmente
    tipoEnergiaGroup.style.display = 'none';
    
    // Mostrar/ocultar tipos de energía según selección
    document.querySelectorAll('input[name="usa-energia"]').forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'si') {
                tipoEnergiaGroup.style.display = 'block';
                tipoEnergiaGroup.classList.add('fade-in');
            } else {
                tipoEnergiaGroup.style.display = 'none';
                // Desmarcar todas las opciones si selecciona "No"
                document.querySelectorAll('input[name="tipo-energia"]').forEach(checkbox => {
                    checkbox.checked = false;
                });
            }
        });
    });
    
    // Limpiar formulario
    btnLimpiar.addEventListener('click', function() {
        encuestaForm.reset();
        tipoEnergiaGroup.style.display = 'none';
    });
    
    // Enviar formulario
    encuestaForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validación adicional
        const nivel = document.getElementById('nivel').value;
        const edad = document.getElementById('edad').value;
        const usaEnergia = document.querySelector('input[name="usa-energia"]:checked');
        
        if (!nivel || !edad || !usaEnergia) {
            alert('Por favor completa todos los campos requeridos.');
            return;
        }
        
        // Simular envío de datos
        setTimeout(() => {
            // Mostrar resultado
            resultadoContainer.classList.remove('hidden');
            resultadoContainer.classList.add('show');
            
            // Animación de la barra de progreso
            let progress = 0;
            const interval = setInterval(() => {
                progress += 1;
                progressFill.style.width = `${progress}%`;
                contador.textContent = `${progress}`;
                
                if (progress >= 100) {
                    clearInterval(interval);
                    contador.textContent = "¡100% completado!";
                }
            }, 20);
            
            // Desplazarse al inicio
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 500);
    });
    
    // Botón ver resultados (simulación)
    btnVerResultados.addEventListener('click', function() {
        alert('Esta funcionalidad mostraría los resultados acumulados de todas las encuestas. En una implementación real, se conectaría a una base de datos.');
    });
    
    // Efecto hover en las secciones del formulario
    const formSections = document.querySelectorAll('.form-section');
    formSections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.05)';
        });
    });
    
    // Efecto de carga inicial
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
});
