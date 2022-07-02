
// Developed by: Nicolás Cabrera Rodríguez 

const CANVAS = document.getElementById('lienzo'); // Obtiene el lienzo
const CTX = CANVAS.getContext('2d'); // Obtiene el contexto del lienzo
CANVAS.width = window.innerWidth; // Ajusta el ancho del lienzo
CANVAS.height = window.innerHeight; // Ajusta el alto del lienzo
let arrayParticula = []; // Array de particulas
let ajustarX = 6; // Ajusta la posicion de las particulas en el eje x
let ajustarY = 0; // Ajusta la posicion de las particulas en el eje y
CTX.anchoLinea = 1; // Ancho de la linea

// * MOUSE * //
const MOUSE = { // Objeto de mouse

  x: null, // Posicion x del mouse

  y: null, // Posicion y del mouse

  radius: 150 // Radio del mouse
};

// * EVENTO DEL MOUSE * //
window.addEventListener('mousemove', (event) => { // Evento de mouse

  MOUSE.x = event.x; // Posicion x del mouse

  MOUSE.y = event.y; // Posicion y del mouse
});

const VERTICAL = 30; // Ajusta el texto en el eje y
const HORIZONTAL = 0 ; // Ajusta el texto en el eje x
CTX.fillStyle = '#fff'; // Ajusta el color de la linea
CTX.font = '22px Arial'; // Ajusta el tamaño de la fuente
CTX.fillText('Pasame',HORIZONTAL,VERTICAL); // Ajusta el texto
const coordenadasTexto = CTX.getImageData(0,0,100,100); // Obtiene las coordenadas del texto

// * INICIALIZACION * //
class Particula {  // Inicializa el array de particulas

  constructor(x, y) { // Se crea el constructor de la particula

    this.x = x; // Posicion x de la particula

    this.y = y; // Posicion y de la particula

    this.size = 3; // Tamaño de la particula

    this.baseX = this.x; // Posicion x base de la particula

    this.baseY = this.y; // Posicion y base de la particula

    this.densidad = (Math.random() * 40) + 5; // Densidad de la particula
  };

  // * DIBUJA LA PARTICULA * //
  draw() { // Dibuja la particula

    CTX.fillStyle = '#fff'; // Ajusta el color de la linea

    CTX.beginPath(); // Inicia el trazado

    CTX.arc(this.x, this.y, this.size, 0, Math.PI * 2); // Dibuja la particula

    CTX.closePath(); // Cierra el trazado

    CTX.fill(); // Rellena la particula
  };

  // * MOVER LA PARTICULA * //
  update() { // Mueve la particula

    let dx = MOUSE.x - this.x; // Calcula la distancia en x

    let dy = MOUSE.y - this.y; // Calcula la distancia en y

    let distancia = Math.sqrt(dx * dx + dy * dy); // Calcula la distancia

    let fuerzaDireccionX = dx / distancia; // Calcula la fuerza en x

    let fuerzaDireccionY = dy / distancia; // Calcula la fuerza en y

    let distanciaMaxima = MOUSE.radius; // Calcula la distancia maxima

    let fuerza = (distanciaMaxima - distancia) / distanciaMaxima; // Calcula la fuerza

    let direccionX = fuerzaDireccionX * fuerza * this.densidad; // Calcula la direccion en x

    let direccionY = fuerzaDireccionY * fuerza * this.densidad; // Calcula la direccion en y


    if (distancia < MOUSE.radius) { // Si la distancia es menor que el radio del mouse

      this.x -= direccionX; // Mueve la particula en x

      this.y -= direccionY; // Mueve la particula en y

    } else { // Si la distancia es mayor que el radio del mouse

      if (this.x !== this.baseX) { // Si la posicion x de la particula no es la base

        let dx = this.x - this.baseX; // Calcula la distancia en x

        this.x -= dx / 10; // Mueve la particula en x

      };

      if (this.y !== this.baseY) { // Si la posicion y de la particula no es la base

        let dy = this.y - this.baseY; // Calcula la distancia en y

        this.y -= dy / 10; // Mueve la particula en y

      };
    };
  };
};


function init() { // Inicializa la animacion

  arrayParticula = []; // Inicializa el array de particulas

  for (let y = 0, y2 = coordenadasTexto.height; y < y2; y++) { // Recorre el texto

    for (let x = 0, x2 = coordenadasTexto.width; x < x2; x++) { // Recorre el texto

      if (coordenadasTexto.data[(y * 4 * coordenadasTexto.width) + (x * 4) + 3] > 128) { // Si el pixel es mayor que 128

        let posicionX = x + ajustarX; // Calcula la posicion x de la particula

        let posicionY = y + ajustarY; // Calcula la posicion y de la particula

        arrayParticula.push(new Particula(posicionX * 20, posicionY * 20)); // Agrega la particula al array

      }
    };
  };
};

init(); // Inicializa la animacion
console.log(arrayParticula); // Imprime el array de particulas

function animacion() { // Animacion de la animacion

  CTX.clearRect(0, 0, CANVAS.width, CANVAS.height); // Limpia el lienzo

  for (let i = 0; i < arrayParticula.length; i++) { // Recorre el array de particulas

    arrayParticula[i].draw(); // Dibuja la particula

    arrayParticula[i].update(); // Mueve la particula

  };

  conexion(); // Conecta las particulas

  requestAnimationFrame(animacion); // Llama a la función animacion

};

animacion(); // Llama a la función animacion

function conexion() { // Conecta las particulas

  let valorOpacidad = 1; // Valor de opacidad

  for (let i = 0; i < arrayParticula.length; i++) { // Recorre el array de particulas

    for (let j = 0; j < arrayParticula.length; j++) { // Recorre el array de particulas

      let dx = arrayParticula[i].x - arrayParticula[j].x; // Calcula la distancia entre las particulas

      let dy = arrayParticula[i].y - arrayParticula[j].y; // Calcula la distancia entre las particulas

      let distancia = Math.sqrt(dx * dx + dy * dy); // Calcula la distancia entre las particulas

      if (distancia < 50) { // Si la distancia es menor a 50

        CTX.beginPath(); // Inicia el trazo

        CTX.anchoLinea = 2; // Ajusta el ancho de la linea

        CTX.strokeStyle = `rgba(255,255,255,${valorOpacidad})`; // Ajusta el color de la linea

        CTX.moveTo(arrayParticula[i].x, arrayParticula[i].y); // Mueve el trazo a la posicion de la particula

        CTX.lineTo(arrayParticula[j].x, arrayParticula[j].y); // Hace una linea desde la posicion de la particula
        
        CTX.stroke(); // Dibuja la linea
      }
    }

  };
};