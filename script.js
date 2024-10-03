const container = document.querySelector(".container");
const containercarrossel = container.querySelector(".container-carrossel");
const carrossel = container.querySelector(".carrossel");
const carrosselItems = carrossel.querySelectorAll(".carrossel-item");

// Variables que cambiarán estado.
let isMouseDown = false;
let currentMousePos = 0;
let lastMousePos = 0;
let lastMoveTo = 0;
let moveTo = 0;
let currentIndex = 0; // Índice actual del carrusel

const createcarrossel = () => {
  const carrosselProps = onResize();
  const length = carrosselItems.length; // Longitud del array
  const degrees = 360 / length; // Grados por cada item
  const gap = 20; // Espacio entre cada item
  const tz = distanceZ(carrosselProps.w, length, gap);

  const fov = calculateFov(carrosselProps);
  const height = calculateHeight(tz);

  container.style.width = tz * 2 + gap * length + "px";
  container.style.height = height + "px";

  carrosselItems.forEach((item, i) => {
    const degreesByItem = degrees * i + "deg";
    item.style.setProperty("--rotatey", degreesByItem);
    item.style.setProperty("--tz", tz + "px");
  });

  // Actualiza la rotación inicial del carrusel
  carrossel.style.setProperty("--rotatey", moveTo + "deg");
};

// Función para mover el carrusel
const moveCarousel = (direction) => {
  const length = carrosselItems.length;
  currentIndex = (currentIndex + direction + length) % length; // Ajusta el índice
  const degrees = 360 / length;
  moveTo = -currentIndex * degrees; // Calcula el nuevo ángulo
  carrossel.style.setProperty("--rotatey", moveTo + "deg"); // Aplica el movimiento
};

// Función que da suavidad a la animación
const lerp = (a, b, n) => {
  return n * (a - b) + b;
};

// https://3dtransforms.desandro.com/carousel
const distanceZ = (widthElement, length, gap) => {
  return widthElement / 2 / Math.tan(Math.PI / length) + gap; // Distancia Z de los items
};

// Calcula el alto del contenedor usando el campo de visión y la distancia de la perspectiva
const calculateHeight = (z) => {
  const t = Math.atan((90 * Math.PI) / 180 / 2);
  const height = t * 2 * z;

  return height;
};

// Calcula el campo de visión del carrusel
const calculateFov = (carrosselProps) => {
  const perspective = window
    .getComputedStyle(containercarrossel)
    .perspective.split("px")[0];

  const length =
    Math.sqrt(carrosselProps.w * carrosselProps.w) +
    Math.sqrt(carrosselProps.h * carrosselProps.h);
  const fov = 2 * Math.atan(length / (2 * perspective)) * (180 / Math.PI);
  return fov;
};

// Obtiene la posición X y evalúa si la posición es derecha o izquierda
const getPosX = (x) => {
  currentMousePos = x;
  moveTo = currentMousePos < lastMousePos ? moveTo - 2 : moveTo + 2;
  lastMousePos = currentMousePos;
};

const update = () => {
  lastMoveTo = lerp(moveTo, lastMoveTo, 0.05);
  carrossel.style.setProperty("--rotatey", lastMoveTo + "deg");

  requestAnimationFrame(update);
};

const onResize = () => {
  // Obtiene las propiedades del tamaño del carrusel
  const boundingcarrossel = containercarrossel.getBoundingClientRect();

  const carrosselProps = {
    w: boundingcarrossel.width,
    h: boundingcarrossel.height,
  };

  return carrosselProps;
};

const initEvents = () => {
  // Eventos del mouse
  carrossel.addEventListener("mousedown", () => {
    isMouseDown = true;
    carrossel.style.cursor = "grabbing";
  });
  carrossel.addEventListener("mouseup", () => {
    isMouseDown = false;
    carrossel.style.cursor = "grab";
  });
  container.addEventListener("mouseleave", () => (isMouseDown = false));
  carrossel.addEventListener("mousemove", (e) => isMouseDown && getPosX(e.clientX));

  // Eventos del touch
  carrossel.addEventListener("touchstart", () => {
    isMouseDown = true;
    carrossel.style.cursor = "grabbing";
  });
  carrossel.addEventListener("touchend", () => {
    isMouseDown = false;
    carrossel.style.cursor = "grab";
  });
  container.addEventListener("touchmove", (e) => isMouseDown && getPosX(e.touches[0].clientX));

  // Agrega eventos a los botones
  document.querySelector(".next").addEventListener("click", () => moveCarousel(1));
  document.querySelector(".prev").addEventListener("click", () => moveCarousel(-1));

  window.addEventListener("resize", createcarrossel);

  update();
  createcarrossel();
};

initEvents();



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