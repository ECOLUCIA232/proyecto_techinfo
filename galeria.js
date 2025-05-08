document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar todas las imágenes de la galería
    const imagenes = document.querySelectorAll('.imagen-galeria');
    const modal = document.createElement('div');
    modal.id = 'modal';
    modal.className = 'modal';
    modal.innerHTML = `
        <span class="cerrar">&times;</span>
        <img class="modal-contenido" id="imagen-modal">
    `;
    document.body.appendChild(modal);
    
    const imagenModal = document.getElementById('imagen-modal');
    const spanCerrar = document.querySelector('.cerrar');
    
    // Abrir modal al hacer clic en una imagen
    imagenes.forEach(imagen => {
        imagen.addEventListener('click', function() {
            modal.style.display = 'block';
            imagenModal.src = this.src;
            document.body.style.overflow = 'hidden'; // Evitar scroll
        });
    });
    
    // Cerrar modal
    spanCerrar.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Cerrar al hacer clic fuera de la imagen
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Efecto hover mejorado para dispositivos táctiles
    imagenes.forEach(imagen => {
        imagen.parentElement.addEventListener('touchstart', function() {
            this.classList.add('hover');
        });
        
        imagen.parentElement.addEventListener('touchend', function() {
            setTimeout(() => this.classList.remove('hover'), 500);
        });
    });
});