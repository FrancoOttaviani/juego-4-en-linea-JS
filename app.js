var estado = [
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
  ]
  var turno=1
  window.onload = function(){
    estado.forEach(function ( fila, y ){
        fila.forEach(function( celdaValor, x){
            var celdaElemento = document.getElementById( x + "-" + y )
            celdaElemento.onclick = function () {
                
                if(turno===1){
                    estado[y][x] = 1
                    turno = turno + 1 
                    pintarTablero()
                }
                else if (turno===2){
                    estado[y][x] = 2
                    turno = turno - 1
                    pintarTablero()
                }
            }
        })
    })
      pintarTablero()
  }

  var pintarTablero = function(){
    estado.forEach(function ( fila, y ){
        fila.forEach(function( celdaValor, x){
          var celdaElemento = document.getElementById( x + "-" + y )
          if (celdaValor === 1){
              celdaElemento.className = "celda jugador1"
          }
          else if (celdaValor === 2){
              celdaElemento.className = "celda jugador2"
          }
        })
    })
  }