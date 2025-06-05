document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const form = document.getElementById('encuestaForm');
    const steps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    const nextBtns = document.querySelectorAll('.next-btn');
    const prevBtns = document.querySelectorAll('.prev-btn');
    const optionBtns = document.querySelectorAll('.option-btn');
    const nivelInput = document.getElementById('nivel');
    const frecuenciaSlider = document.getElementById('frecuencia');
    const comentariosTextarea = document.getElementById('comentarios');
    const charCount = document.getElementById('char-count');
    const resultadosDiv = document.getElementById('resultados');
    const resNivel = document.getElementById('res-nivel');
    const resEnergias = document.getElementById('res-energias');
    const resFrecuencia = document.getElementById('res-frecuencia');
    const resComentarios = document.getElementById('res-comentarios');
    const resComentariosContainer = document.getElementById('res-comentarios-container');
    const randomTip = document.getElementById('random-tip');
    const nuevaEncuestaBtn = document.getElementById('nuevaEncuesta');

    // Datos para consejos ecológicos
    const ecoTips = [
        "Las energías renovables podrían reducir las emisiones de CO2 en un 70% para 2050.",
        "Un panel solar puede generar energía limpia por más de 25 años.",
        "La energía eólica es una de las fuentes más limpias y eficientes disponibles hoy.",
        "Apagar dispositivos electrónicos cuando no se usan puede ahorrar hasta un 10% de energía.",
        "Las escuelas que usan energía solar ahorran dinero que pueden invertir en educación.",
        "La biomasa aprovecha residuos orgánicos que de otra forma se desperdiciarían."
    ];

    // Variables de estado
    let currentStep = 0;

    // Inicialización
    showStep(currentStep);
    updateProgressBar();

    // Event Listeners
    optionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            selectOption(this);
        });
    });

    nextBtns.forEach(btn => {
        btn.addEventListener('click', nextStep);
    });

    prevBtns.forEach(btn => {
        btn.addEventListener('click', prevStep);
    });

    frecuenciaSlider.addEventListener('input', updateFrequencyLabel);

    comentariosTextarea.addEventListener('input', function() {
        charCount.textContent = this.value.length;
        if (this.value.length > 200) {
            this.value = this.value.substring(0, 200);
            charCount.textContent = 200;
        }
    });

    form.addEventListener('submit', submitForm);

    nuevaEncuestaBtn.addEventListener('click', resetForm);

    // Funciones
    function showStep(step) {
        steps.forEach((stepElement, index) => {
            stepElement.classList.toggle('active', index === step);
        });

        // Actualizar botones de navegación
        document.querySelector('.prev-btn').disabled = step === 0;
        document.querySelector('.next-btn').disabled = step === steps.length - 1;
        
        if (step === steps.length - 1) {
            document.querySelector('.next-btn').style.display = 'none';
            document.querySelector('.prev-btn').style.flex = '1';
        } else {
            document.querySelector('.next-btn').style.display = 'flex';
            document.querySelector('.prev-btn').style.flex = '';
        }
    }

    function nextStep() {
        if (validateStep(currentStep)) {
            currentStep++;
            showStep(currentStep);
            updateProgressBar();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    function prevStep() {
        currentStep--;
        showStep(currentStep);
        updateProgressBar();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function selectOption(btn) {
        optionBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        nivelInput.value = btn.dataset.value;
    }

    function updateProgressBar() {
        progressSteps.forEach((step, index) => {
            step.classList.toggle('active', index <= currentStep);
        });
    }

    function updateFrequencyLabel() {
        const labels = ['Nunca', 'Ocasionalmente', 'Mensualmente', 'Semanalmente', 'Diariamente'];
        const value = parseInt(frecuenciaSlider.value);
        frecuenciaSlider.setAttribute('data-value', labels[value]);
    }

    function validateStep(step) {
        let isValid = true;
        
        if (step === 0 && !nivelInput.value) {
            alert('Por favor selecciona tu nivel educativo');
            isValid = false;
        }
        
        if (step === 1) {
            const checkedEnergies = document.querySelectorAll('input[name="energia"]:checked');
            if (checkedEnergies.length === 0) {
                alert('Por favor selecciona al menos una opción de energía renovable');
                isValid = false;
            }
        }
        
        return isValid;
    }

    function submitForm(e) {
        e.preventDefault();
        
        if (validateStep(currentStep)) {
            // Obtener datos del formulario
            const nivel = nivelInput.value;
            const energias = Array.from(document.querySelectorAll('input[name="energia"]:checked')).map(el => el.value);
            const frecuencia = parseInt(frecuenciaSlider.value);
            const comentarios = comentariosTextarea.value;
            
            // Mostrar resultados
            resNivel.textContent = getNivelText(nivel);
            resEnergias.textContent = energias.map(getEnergiaText).join(', ') || 'Ninguna';
            resFrecuencia.textContent = getFrecuenciaText(frecuencia);
            
            if (comentarios) {
                resComentarios.textContent = comentarios;
                resComentariosContainer.style.display = 'flex';
