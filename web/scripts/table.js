var container = document.querySelector(".box");
const casillas = 9;

window.addEventListener("resize", ()=> {
    drawEverything();
});

var puchero;

function drawEverything() {
    //container.removeChild(puchero);
    document.getElementById('tablero').innerHTML = '';
    
    // crear puchero
    
    puchero = document.createElement('canvas');
    puchero.setAttribute('id', 'testCanvas');
    puchero.classList.add('puchero');
    puchero.width = document.getElementById('tablero').offsetWidth / 3;
    puchero.height = document.getElementById('tablero').offsetHeight / 3;
    container.appendChild(puchero);
    pintarPuchero(puchero);
    // Crear elementos canvas para las casillas
    // Usar un bucle for para crear los elementos de manera automática

    var newWidth = document.getElementById('tablero').offsetWidth / 3;
    var newHeight = document.getElementById('tablero').offsetHeight / 3;
    
    // Los canvas se formarán en una elipse
    for (var i = 0; i < casillas; i++) {
        // Crear un elemento canvas
        var canvas = document.createElement('canvas');
        canvas.classList.add('casilla');
        // Establecer el ancho y alto del canvas en 50 (cada canvas será de 50 x 50)
        canvas.width = newWidth;
        canvas.height = newHeight;
        // Añadir el canvas a la página
        container.appendChild(canvas);
    }

    // Obtener una referencia a todos los elementos canvas en la página
    var canvases = document.querySelectorAll('.casilla');
    
    // Dibujar una elipse en cada canvas y posicionarlos en una elipse de
    for (var i = 0; i < canvases.length; i++) {
        // Obtener el contexto del canvas en 2D
        var ctx = canvases[i].getContext('2d');
        
        // Dibujar una elipse en el canvas
        ctx.beginPath();
        
        //ctx.ellipse(35, 35, 35, 35, 0, 0, 2 * Math.PI);
        //ctx.stroke();
        
        // Posicionar el canvas en la elipse
        canvases[i].style.left = Math.cos(2 * Math.PI * i / casillas) * newWidth + newWidth + 'px';
        canvases[i].style.top = Math.sin(2 * Math.PI * i / casillas) * newHeight + (newHeight + 50)  - 25  + 'px';
        
        if (i > 4) {
            pintarCasilla(canvases[i], i + 3);
        } else {
            pintarCasilla(canvases[i], i + 2);
        }
    }
    
    

    // pintamos fichas aleatorias en el tablero
    for (let i=0; i < canvases.length; i++) {
        let fichas = 0;

        let thisTile = i >= 5 ? tiles.get(i+3) : tiles.get(i+2);
        
        if (thisTile != null) {
            fichas = thisTile.chips;
        }
        //let fichas = Math.ceil(Math.random()*(i+2));
        
        if (i > 4) {
            pintarCasilla(canvases[i], i+3, fichas);
        } else {
            pintarCasilla(canvases[i], i+2, fichas);
        }
    }

    //pintarCasilla(canvases[2], 4, 2); // pinta dos fichas en el 4
    //pintarCasilla(canvases[8], 11, 5); // pinta 5 fichas en el 11
    //pintarCasilla(canvases[6], 9, 3); // pinta 3 fichas en el 9
}

function pintarCasilla(canvas, fichas, num) {
    var ctx = canvas.getContext('2d');
    var newWidth = document.getElementById('tablero').offsetWidth / 10;
    
    ctx.arc(canvas.width / 2, canvas.height / 2, newWidth, 0, 2 * Math.PI);
    ctx.fillStyle = 'green';
    ctx.fill();
    
    var newWidth = document.getElementById('tablero').offsetWidth / 15;
    
    for (var i = 0; i < fichas; i++) {
        // Calcular la posición en el círculo para cada ficha
        var x = Math.cos(2 * Math.PI * i / fichas) * newWidth + canvas.width / 2;
        var y = Math.sin(2 * Math.PI * i / fichas) * newWidth + canvas.height / 2;
        
        // Dibujar la ficha en la posición calculada
        ctx.beginPath();
        ctx.arc(x, y, newWidth / 4, 0, 2 * Math.PI);
        
        if (i < num ) {
            ctx.fillStyle = 'blue';
        } else {
            ctx.fillStyle = 'white';
        }
        
        ctx.fill();
        
        ctx.fillStyle = 'white';
        // Establecer la fuente para el texto
        ctx.font = '24px sans-serif';
        // Dibujar el número en el canvas usando el método fillText()
        x = canvas.width / 2 - ctx.measureText(fichas).width / 2;
        y = canvas.height / 2 + 10;
        ctx.fillText(fichas, x, y);
    }
}

function pintarPuchero(canvas) {
    var ctx = canvas.getContext('2d');
    var newWidth = document.getElementById('tablero').offsetWidth / 10;
    var newWidthChips = document.getElementById('tablero').offsetWidth / 15;
    
    canvas.width -= newWidth;
    
    ctx.arc(canvas.width / 2, canvas.height / 2, newWidth, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
    
    for (var i = 0; i < 4; i++) {
        // Calcular la posición en el círculo para cada ficha
        var x = Math.cos(2 * Math.PI * i / 4) * newWidthChips + canvas.width / 2;
        var y = Math.sin(2 * Math.PI * i / 4) * newWidthChips + canvas.height / 2;
        
        // Dibujar la ficha en la posición calculada
        ctx.beginPath();
        ctx.arc(x, y, newWidthChips / 4, 0, 2 * Math.PI);
        
        let thisTile = tiles.get(7);
        
        if (thisTile == null) {
            ctx.fillStyle = 'white';
        } else {
            ctx.fillStyle = thisTile.chips > i ? 'blue' : 'white';
        }
        
        ctx.fill();
        
        ctx.fillStyle = 'white';
        // Establecer la fuente para el texto
        ctx.font = '24px sans-serif';
        // Dibujar el número en el canvas usando el método fillText()
        x = canvas.width / 2 - ctx.measureText(7).width / 2;
        y = canvas.height / 2 + 10;
        ctx.fillText(7, x, y);
    }
}
