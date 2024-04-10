document.addEventListener('DOMContentLoaded', function() {
    const amountDisplay = document.getElementById('amount');
    const eurosDisplay = document.getElementById('euros');
    const addButton = document.getElementById('addButton');
    const removeButton = document.getElementById('removeButton');
    const removeEuroButton = document.getElementById('removeEuroButton');
    const huchaImage = document.getElementById('hucha');

    // Sonido de cerdito
    const audio = new Audio('audio2.mp3'); // Reemplaza 'cerdito.mp3' con la ruta a tu archivo de sonido

    // Obtener valores almacenados o establecer a cero si no existen
    let amount = parseInt(localStorage.getItem('amount')) || 0;
    let euros = parseInt(localStorage.getItem('euros')) || 0;

    function updateAmount() {
        // Calcula los euros actuales antes de la actualización
        const previousEuros = euros;
    
        // Sumar euros automáticamente cada vez que se alcancen 100 céntimos (1 euro)
        euros += Math.floor(amount / 100);
        amount = amount % 100; // Restar los céntimos equivalentes a los euros añadidos
    
        amountDisplay.textContent = `${amount} céntimos`;
        eurosDisplay.textContent = `${euros} euros`;
    
        // Guardar los valores en localStorage
        localStorage.setItem('amount', amount);
        localStorage.setItem('euros', euros);
    
        // Verificar si se ha incrementado el número de euros
        if (euros > previousEuros) {
            // Aplicar la clase de animación shake al cerdito y reproducir el sonido
            huchaImage.classList.add('shake');
            audio.play();
    
            // Quitar la clase de animación después de un tiempo
            setTimeout(() => {
                huchaImage.classList.remove('shake');
            }, 500); // Duración de la animación en milisegundos
        }
    }

    // Función para agregar 10 céntimos
    addButton.addEventListener('click', function() {
        amount += 10;
        updateAmount();
    });

    // Función para quitar 10 céntimos
    removeButton.addEventListener('click', function() {
        if (amount >= 10) {
            amount -= 10;
            updateAmount();
        }
    });

    // Función para quitar un euro completo
    removeEuroButton.addEventListener('click', function() {
        if (euros > 0) {
            euros--;
            updateAmount();
        }
    });

    // Llamar a la función de actualización al cargar la página
    updateAmount();
});