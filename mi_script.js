document.addEventListener('DOMContentLoaded', function() {
    const boton = document.getElementById('boton-interactivo');
    
    boton.addEventListener('click', function() {
        alert('¡Gracias por visitar nuestro proyecto social!');
        
        // Cambia el color de fondo del botón
        const colores = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6'];
        const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
        boton.style.backgroundColor = colorAleatorio;
        
        // Cambia el texto del botón
        boton.textContent = '¡Gracias por tu interés!';
    });
});