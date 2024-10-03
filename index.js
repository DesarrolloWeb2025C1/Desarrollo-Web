function toggleContent(id) {
    var content = document.getElementById(id);
    if (content.style.display === "none") {
        content.style.display = "block";

    } else {
        content.style.display = "none";
    }
}

function toggleContent(id, button) {
    var content = document.getElementById(id);
    var buttonId = document.getElementById(button);

    if (content.style.display === "none") {
        content.style.display = "block";
        buttonId.innerHTML  = "Ver menos";


    } else {
        content.style.display = "none";
        buttonId.innerHTML  = "Ver más";
    }
}

// Variables
const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slide').length;
let currentIndex = 0;

// Función para avanzar a la siguiente imagen
function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Función para retroceder a la imagen anterior
function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Iniciar el carrusel automáticamente cada 10 segundos
setInterval(nextSlide, 10000); // Cambia cada 10 segundos

// Asociar eventos a los botones
document.querySelector('.carousel-control-next').addEventListener('click', nextSlide);
document.querySelector('.carousel-control-prev').addEventListener('click', prevSlide);
