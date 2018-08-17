var fichas;
var TorreA;
var TorreB;
var TorreC;

$(document).ready(function(){
    fichas= new Array();
    TorreA= new Array();
    TorreB= new Array();
    TorreC= new Array();
    let ficha1={id: 1, html:'<div id="1" style="margin:auto; width: 10%; height: 30px; background-color: darkgrey; border-radius: 5px; border-style: solid;"></div>'};
    let ficha2={id: 2, html:'<div id="2" style="margin:auto; width: 20%; height: 30px; background-color: cornsilk; border-radius: 5px; border-style: solid;"></div>'};
    let ficha3={id: 3, html:'<div id="3" style="margin:auto; width: 30%; height: 30px; background-color: violet; border-radius: 5px; border-style: solid;"></div>'};
    let ficha4={id: 4, html:'<div id="4" style="margin:auto; width: 40%; height: 30px; background-color: skyblue; border-radius: 5px; border-style: solid;"></div>'};
    let ficha5={id: 5, html:'<div id="5" style="margin:auto; width: 50%; height: 30px; background-color: orange; border-radius: 5px; border-style: solid;"></div>'};
    let ficha6={id: 6, html:'<div id="6" style="margin:auto; width: 60%; height: 30px; background-color: yellow; border-radius: 5px; border-style: solid;"></div>'};
    let ficha7={id: 7, html:'<div id="7" style="margin:auto; width: 70%; height: 30px; background-color: purple; border-radius: 5px; border-style: solid;"></div>'};
    let ficha8={id: 8, html:'<div id="8" style="margin:auto; width: 80%; height: 30px; background-color: greenyellow; border-radius: 5px; border-style: solid;"></div>'};
    let ficha9={id: 9, html:'<div id="9" style="margin:auto; width: 90%; height: 30px; background-color: blue; border-radius: 5px; border-style: solid;"></div>'};
    let ficha10={id: 10, html:'<div id="10" style="margin:auto; width: 100%; height: 30px; background-color: red; border-radius: 5px; border-style: solid;"></div>'};
    let fichaNula={id: 0, html:'<div id="0" style="margin:auto; width: 100%; height: 30px;"></div>'};
    fichas.push(ficha1, ficha2, ficha3, ficha4, ficha5, ficha6, ficha7, ficha8, ficha9, ficha10, fichaNula);
});

function Mostrar_Fichas_Torre(fichasMostrar, torre){
    document.getElementById(torre).innerHTML = '';
    let relleno = new Array();
    for(let i = 1; i<= 10 - fichasMostrar.length; i++){
        relleno.push("0");
    }
    fichasMostrar = relleno.concat(fichasMostrar);
    fichasMostrar.forEach(fichaMostrar => {
        fichas.forEach(fichaDisponible => {
            if(fichaMostrar == fichaDisponible.id){
                document.getElementById(torre).innerHTML += fichaDisponible.html; 
            }
        });
    });
}

function Mostrar_Posicion(){
    Mostrar_Fichas_Torre(TorreA,'A');
    Mostrar_Fichas_Torre(TorreB,'B');
    Mostrar_Fichas_Torre(TorreC,'C');
}

function Inicializar(){
    if(document.getElementById("numero_fichas").value>10){
        document.getElementById("numero_fichas").value = 10;
    }
    if(document.getElementById("numero_fichas").value<0){
        document.getElementById("numero_fichas").value = 0;
    }
    $.get("http://lsalazardev.000webhostapp.com/torre_hanoi/server/juego/iniciar?numero_discos=" + document.getElementById("numero_fichas").value, function(data, status){
        if(status == 'success'){
            let respuesta = JSON.parse(data); 
            TorreA = respuesta.A;
            TorreB = respuesta.B;
            TorreC = respuesta.C;
            Mostrar_Posicion();
        }
    });
}

function Mover(desde, hacia){
    let posicion = {A: TorreA, B: TorreB, C: TorreC};
    $.get("http://lsalazardev.000webhostapp.com/torre_hanoi/server/juego/movimiento?desde="+ desde +"&hacia="+ hacia +"&posicion="+JSON.stringify(posicion), function(data, status){
        if(status == 'success'){
            if(data == 'false'){
                alert("Movimiento no permitido");
                return;
            }
            let respuesta = JSON.parse(data); 
            TorreA = respuesta.A;
            TorreB = respuesta.B;
            TorreC = respuesta.C;
            Mostrar_Posicion();
        }
    });
}

function MoverBoton(){
    Mover(document.getElementById("desde").value, document.getElementById("hacia").value);
}

function Resolver(){
    Mover('A','B');
    Mover("A","C");

    Mover("B","C");
    Mover("A","B");

    Mover("C","B");
    Mover("C","A");

    Mover("B","A");
    Mover("B","C");

    Mover("A","B");

    Mover("A","C");

    Mover("B","C");
}
