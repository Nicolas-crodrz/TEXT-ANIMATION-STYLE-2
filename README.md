# **ESPAÑOL**

## **Desarrollado por Nicolás Cabrera Rodríguez**

## **⚪Texto animado con Particulas entrelazadas⚪**

![Gif del efecto](TEXT-ANIMATION-STYLE-2/img/readmeGif.gif "Gif del efecto ;)")

## Tenemos los siguientes **campos** a destacar

### **Colision con el raton 🖱️**

 Aqui se esta creando una constante con el nombre *MOUSE*, que tambien es un objeto con los valores:

     x: Establece la posicion del raton en el eje x.
     y: Establece la posicion del raton en el eje y. 
     radius: Establece el radio del raton.

### **Evento para detectar el movimiento del raton 🖱️**

 Creamos un evento 'addEventListener', para que nos establesca la posicion del raton.

```javascript

// * EVENTO DEL MOUSE * //
window.addEventListener('mousemove', (event) => { // Evento de mouse
  MOUSE.x = event.x; // Posicion x del mouse
  MOUSE.y = event.y; // Posicion y del mouse
});

```

### **Estilo del texto**

En este apartado podemos editar el texto mostrado en pantalla.

```javascript 
const VERTICAL = 30; // Ajusta el texto en el eje y
const HORIZONTAL = 0 ; // Ajusta el texto en el eje x
CTX.fillStyle = '#fff'; // Ajusta el color de la linea
CTX.font = '22px Arial'; // Ajusta el tamaño de la fuente
CTX.fillText('Pasame',HORIZONTAL,VERTICAL); // Ajusta el texto
const coordenadasTexto = CTX.getImageData(0,0,100,100); // Obtiene las coordenadas del texto
```

### **Clase Particula**

Creamos una clase Particula.
Dentro de la clase particula tenemos un **draw**( Se utiliza para dibujar las particulas).
Tambien tenemos un **update** que usaremos para actualizar la posicion de las particulas.

### **Funcion para crear las particulas :cre**

Esta funcion vacia el array de particulas y las vuelve a crear, segun en la posicion x/y en la que se encuentren.

### **Funcion para actualizar la particula**

Actualiza la posicion de las particulas

### **Funcion para conectar las particulas**

Calcula la distancia entre las particulas y las mueve
