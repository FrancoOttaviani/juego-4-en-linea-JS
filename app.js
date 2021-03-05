var estado = [
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
  ]

let iniciar = "pause";
let turno=1;
let ganador = 0;
let tiempoJugadorUno=0;
let tiempoJugadorDos=0;
let intervalId

window.onload = function(){
    let juego = document.getElementById("play")
    let reset = document.getElementById("reset")
    reset.addEventListener('click', function(){
        resetear()
    })
    juego.addEventListener('click', function(){
        juego.innerHTML= "Pause"
        if ( iniciar == "pause"){
            iniciar = "pause"
            configurarCelda()
            configurarTiempo()
        }
        else{
            iniciar = "play" 
        }  
    })
}

var configurarTiempo= function()  {
    intervalId = setInterval(function(){
        if(turno==1){
            document.getElementById("timeJ1").innerHTML="Tiempo jugador uno: "+ tiempoJugadorUno++;
        }
        else if(turno == 2){    
             document.getElementById("timeJ2").innerHTML="Tiempo jugador dos: "+ tiempoJugadorDos++;
        }
    },1000);
}

var configurarCelda = function (){
    estado.forEach(function ( fila, y ){
        fila.forEach(function( celdaValor, x){
            var celdaElemento = document.getElementById( x + "-" + y )
            celdaElemento.onclick = onclickCelda (x)             
            celdaElemento.onmouseover = onmouseoverCelda (x)
            celdaElemento.onmouseout = onmouseoutCelda (x)
        })
    })  
}

var onclickCelda = function (x) {
    return function () {
        //recorro la columna en busqueda de alguna ficha
        for (y=0; y<=5 ; y++){
            if(estado[y][x] === 1 || estado[y][x] === 2){
                y= y-1
                break
            }
            // si no hay indico el valor de  y es la ultima posicion 
            else if (estado[5][x] == 0){
                y=5
                break
            }

        }
        if(turno===1){
            document.getElementById("turno").innerHTML=("Turno: Jugador dos")
            // cambio estado de la posicion 
            estado[y][x] = 1
                turno = turno + 1 
                pintarTablero()
        }
        else if (turno === 2){
            document.getElementById("turno").innerHTML=("Turno: Jugador uno")
            estado[y][x] = 2
            turno = turno - 1
            pintarTablero()
        }
    }
}
var pintarTablero  = function(){
    estado.forEach(function ( fila, y ){
        fila.forEach(function( celdaValor, x){
            var celdaElemento = document.getElementById( x + "-" + y )
            if (celdaValor === 1){
                celdaElemento.className = "celda jugador1"       
            }
            else if (celdaValor === 2){
                celdaElemento.className = "celda jugador2"
            }
            else{
                celdaElemento.className = "celda"
            }
        })
    })
    validarGanador();
}

var validarGanador = function (){
    verGanadorFila();
    validarGanadorColumna();
    if(ganador == 1){
        alert("Gano el azul");
    }
    if(ganador == 2){
        alert("Gano el rojo");
    }
}

function verGanadorFila(){
    let aux1 = 0;
    let aux2 = 0;
    for (const bidimencional of estado) {
    
        for (const iterator of bidimencional) {
            if(iterator == 1){
                aux1++;
                aux2 = 0;
                if(aux1 == 4){
                    ganador = 1
                    return;
                }    
            }
            else if(iterator == 2){
                aux2++;
                aux1 = 0; 
                if(aux2 == 4){
                    ganador = 2
                    return;
                }
            }
            else {
                aux1 = 0; 
                aux2 = 0;
            };
        }
    }  
}

function validarGanadorColumna(){
    let aux1 = 0;
    let aux2 = 0;
    for (let index = 0; index < 7; index++) {
       
        for (const iterator of estado) { 
            if(iterator[index] == 1){
                aux1++;
                aux2 = 0;
                if(aux1 == 4){     
                    ganador = 1
                    return;
                }
            }
            else if(iterator[index] == 2){
                aux2++;
                aux1 = 0;
                if(aux2 == 4){
                    ganador = 2
                    return;
                }
            }
            else {
            aux1 = 0;
            aux2 = 0;
            }
        }   
    }
    
}

var onmouseoutCelda = function (x){
    return function (){
        var flecha = document.getElementById ("flecha_" + x)
        flecha.style.borderTop = "30px solid transparent"
    }
}
var onmouseoverCelda = function (x){
    return function (){
        var flecha = document.getElementById ("flecha_" + x)
        flecha.style.borderTop = "30px solid red"
    }
}

var resetear = function(){
    iniciar = "pause";
    turno = 1
    ganador = 0
    tiempoJugadorUno = 0 
    tiempoJugadorDos = 0 
    clearInterval(intervalId)
    document.getElementById("timeJ1").innerHTML="Tiempo jugador uno: "+ tiempoJugadorUno;
    document.getElementById("timeJ2").innerHTML="Tiempo jugador dos: "+ tiempoJugadorDos;
    estado = [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
    ];
    pintarTablero()
}