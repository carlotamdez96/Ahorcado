 window.onload=function(){
    const boton = document.querySelector("button");
    boton.addEventListener("click",startGame);
    const resultado = document.querySelector(".mensaje");
    const espacioPalabra = document.querySelector(".palabra");
    var contadorAciertos=0;
   


    document.addEventListener("keydown",teclaPulsada);
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    pintaBaseJuego();
     var palabraGenerada = getPalabra();
    var contadorFallos=0;
    var vidas=7;
    var pista1;
    var pista2="";
    var arrayfallos=[];

    
    

//Funcion que pintará las rallitas donde irá la palabra
(function(){

let tamañoPalabra = palabraGenerada.length;
for (let index = 0; index < tamañoPalabra; index++) {
    var ralla = document.createElement("span");
    ralla.className="palabra__ralla";
    espacioPalabra.appendChild(ralla);   
}
getPista(palabraGenerada);
getinstrucciones();

}()); 


//Funcion autoinvocada la que recoja eventos del teclado

   

    function teclaPulsada(even){
        if(vidas!=0){ // Si tengo vidas...
            console.log(even.keyCode);
        if((even.keyCode>64 && even.keyCode<91)|| (even.keyCode>96 && even.keyCode<123) || (even.keyCode>191 && even.keyCode<193) ){
        var letra= even.key.toUpperCase();
        if(letra!=pista1 && letra!=pista2){
            
        let indices =comprobarPalabra(letra,palabraGenerada);
        if(indices.length>0){ //La letra se encuentra en la palabra
            for (let indice of indices) {
                pintaLetra(indice,letra);
                contadorAciertos++;
            }
            

            //Comprobar si gane
            if(palabraGenerada.length>5){
                if(contadorAciertos+2== palabraGenerada.length){
                    resultado.style.backgroundColor="#f2c063";
                    resultado.innerHTML=`<h1>Ganaste!!!</h1>`
                }
            }else{
                if(contadorAciertos+1== palabraGenerada.length){
                    resultado.style.backgroundColor="#f2c063";
                    resultado.innerHTML=`<h1>Ganaste!!!</h1>`
               
                    
                    // boton.hidden="false";
                }
            }
            
    
        }else{
            //La letra no aparece en la palabra llamo a la funcion que pinta el canvas
            //funcion que comprueba si esa letra ya se ha pintado como fallo
            if(!compruebaFallo(letra)){
                vidas--;
            contadorFallos++;
            pintarFallo(letra);
            arrayfallos.push(letra);
            switch(contadorFallos){
                case 1:
                    pintaSoga();
                    
                break;
                case 2:
                    pintaCabeza();

                break;
                case 3:
                    pintaBarriga();

                break;
                case 4:
                    pintaBrazoD();

                break;
                case 5:
                    pintaBrazoI();

                break;
                case 6:
                    pintaPiernaD();

                break;
                case 7:
                    pintaPiernaI();
                    console.log("Perdiste");
                    resultado.style.backgroundColor="#f2c063";
                    resultado.innerHTML=`<h1>Perdiste!</h1>`
                    pintaSolucion();
                    boton.style.display="block";
               
                    //Mensaje de que perdiste
                    //Se termino el juego funcion reiniciar juego
                break;
                
            }
            }
            
        }
        }
        
    
     }
    }
    }

   
    


//Funcion que compruebe si una letra esta en la palabra y me diga el index
// comprobar si aparece mas de una vez, si no aparece -1
function comprobarPalabra(letra,palabraGenerada){
let contador=0;
let indices=[];
let aparece = false;
   

    for (let index = 0; index < palabraGenerada.length; index++) {
        if(palabraGenerada[index]==letra){
            indices.push(index);
            aparece=true;
        }
        
    }

    if(aparece){
         return indices;

    }else{
        return indices;
    }

    
}

//con el index y la letra, llamo a la funcion pintaletra, 

//Funcion que cuando comience el juego escriba debajo las instrucciones

function getinstrucciones(){
    let instrucciones= document.querySelector(".instrucciones");
    instrucciones.innerHTML=`<p class="instrucciones__parrafo">¡Bienvenido al Juego del Ahorcado del oeste! <br>
    Cuando le salgan las pistas en la pantalla, introduce letra a letra mediante el teclado, las que consideres que necesitas para no acabar AHORCADO!. Cada respuesta que falles más cerca de morir ahorcado estarás.<br>
    ¿Estás listo?</p>`;
}
//Esta funcion comprobará si dentro del array de fallos (las letras ya introducidas que estan mal) se encuentra la letra
function compruebaFallo(letra){
    for (let fallito of arrayfallos) {
        if(fallito === letra){
            return true;
        }
    }
}

//Funcion que con la palabra ya elegida dependiendo de la longitud, de una pista
//La pista será una letra de la palabra

function getPista(palabraGenerada){
let pista =0;
    if(palabraGenerada.length>5){
        //pista =2;
        
       let letra1 = generaPista(palabraGenerada);
       let letra2 = generaPista(palabraGenerada);

        //Mirar si las letras 1 y 2 son iguales
        while(letra1=== letra2){
            letra2 = generaPista(palabraGenerada);
        }
        //Mirar si la letra (pista) aparece mas veces en la palabra

        if(numRepetidasenPalabra(palabraGenerada,letra1)>1){
            let indicePista = palabraGenerada.indexOf(letra1);
             letra1 = palabraGenerada[indicePista+1];
        }else if(numRepetidasenPalabra(palabraGenerada,letra2)>1){
            let indicePista = palabraGenerada.indexOf(letra2);
             letra2 = palabraGenerada[indicePista+1];
        }
    
            //Pintar, con el indexof me dirá el indice donde se encuentra
            pista1=letra1.toUpperCase();
            let indicePista = palabraGenerada.indexOf(letra1);
            pintaLetra(indicePista,letra1);
            pista2=letra2.toUpperCase();
            let indicePista2 = palabraGenerada.indexOf(letra2);
            pintaLetra(indicePista2,letra2);
  

        
    }else{
        // pista=1;

        let letra = generaPista(palabraGenerada);
        if(numRepetidasenPalabra(palabraGenerada,letra)>1){
             letra = generaPista(palabraGenerada);
        }else{
            //Pintar, con el indexof me dirá el indice donde se encuentra
            pista1=letra;
            pista2="";
            let indicePista = palabraGenerada.indexOf(letra);
            pintaLetra(indicePista,letra);
            
           
        }

    }
}

//Funcion pintar LETRA
function pintaLetra(posicion,letra){

  
    let coleccion =document.querySelector(".palabra").children;
    coleccion[posicion].textContent=letra;
    
}
//FUncion pintar fallo
function pintarFallo(letra){
    let espacio = document.querySelector(".fallos");
    espacio.innerHTML+=`<span class="fallos__span"> ${letra} <span> `;
}

//Funcion de genera pista
function generaPista(palabraGenerada){
    return palabraGenerada[generaNum(palabraGenerada.length-1)];

}

//Funcion que mira cuantas veces aparece una letra en la palabra
function numRepetidasenPalabra(palabraGenerada,letraPista){
    let contador=0;
    for (let letra of palabraGenerada) {
        if(letra==letraPista ){
            contador++;
        
        }
    }
    return contador;
}

//Funcion que elige una palabra al azar
function getPalabra() {
    var palabras = [
        "jinete","perdido","brujula","calidad","caballero","valores","control",
        "caminar","vaquero","texas","montaña","ganadero","cazador","cactus","rancho","castigo","enfermo","sentido","establo","antiguo","natural","reflejo","aliento","cansado","cercano",
        "murcielago","esencia","detener","escrito","cosecha","pobreza"
    ];
    let numero = generaNum(palabras.length);
    return palabras[numero].toUpperCase();
}

//Función que genera numeros aleatorios
function generaNum(numeroMaximo){
    return Math.floor(Math.random()*(numeroMaximo-0+1));
}

//Funcion reinicia el juego
function startGame() {
    window.location.reload();
    // boton.hidden="true";
}
//Funcion que pinta la solucion si el usuario falla
function pintaSolucion() {
    let solucion = document.querySelectorAll(".palabra__ralla");
    
    for (let i = 0; i < solucion.length; i++) {
        if(solucion[i].textContent == ""){
            solucion[i].textContent=palabraGenerada[i];
        }
        
    }
}







        // canvas.style.backgroundColor="red";
    function pintaBaseJuego(){
        // Base del suelo
        context.beginPath();
        context.moveTo(100, 350 );
        context.lineTo(200, 350);

        context.lineWidth = 20;
        context.strokeStyle = '#AE5B48';
        context.lineCap = 'square';
        context.stroke();
        
        //Palo
        context.beginPath();
        context.moveTo(120,350);
        context.lineTo(120,80);
        context.lineWidth = 15;
        context.strokeStyle = '#AE5B48';
        context.lineCap = 'round';
        context.stroke();

        //palo superior
        context.beginPath();
     
        context.moveTo(120,80);
        context.lineTo(250,80);
        context.lineWidth=15;
        context.strokeStyle = '#AE5B48';
        context.lineCap = 'round';
        context.stroke();

        //Linea que cruza del palo superior al palo vertical
        context.beginPath();
        context.moveTo(190,80);
        context.lineTo(120,140);
        context.lineWidth=10;
        context.strokeStyle = '#AE5B48';
        context.lineCap = 'round';
        context.stroke();
    }
    
    function pintaSoga(){
    //Soga
        context.beginPath();
        context.moveTo(230,89);
        context.lineTo(230,140);
        context.lineWidth=3;
        context.lineCap = 'square';
        context.strokeStyle = 'black';
        context.stroke();
    }
        
    function pintaCabeza(){
        //cabeza
        context.beginPath();
        context.arc(230,160,25,2*Math.PI,false);
        context.fillStyle="yellow";
        context.fill();
        context.lineWidth=2;
        context.strokeStyle='black';
        context.stroke();

        //ojos
        //Ojo izquierdo
        context.beginPath();
        context.moveTo(215,155);
        context.lineTo(225,160);
        context.strokeStyle='black';
        context.moveTo(225,155);
        context.lineTo(215,160);
        context.strokeStyle='black';
        //Ojo derecho
        context.moveTo(235,155);
        context.lineTo(245,160);
        context.strokeStyle='black';
        context.moveTo(245,155);
        context.lineTo(235,160);
        context.strokeStyle='black';
        context.stroke();

        //boca
        context.beginPath();
        context.moveTo(215,170);
        context.lineTo(245,170);
        context.strokeStyle='black';
        context.stroke();
    }
    
    function pintaBarriga(){
        //Barriga
        context.beginPath();
        context.moveTo(230,190);
        context.lineTo(230,230);
        context.lineWidth=10;
        context.strokeStyle='black';
        context.stroke();
    }

    function pintaBrazoD(){
        //Brazo derecho
        context.beginPath();
        context.moveTo(230,197);
        context.lineTo(270,210);
        context.lineWidth=5;
        context.stroke();
    }    
    function pintaBrazoI(){
        //Brazo izquierdoo
        context.beginPath();
        context.moveTo(230,197);
        context.lineTo(190,210);
        context.lineWidth=5;
        context.stroke();
    }
    function pintaPiernaD(){
        //Pierna derecha
        context.beginPath();
        context.moveTo(230,230);
        context.lineTo(260,260);
        context.lineWidth=5;
        context.stroke();
    }
    function pintaPiernaI(){
        //Pierna izquierda
        context.beginPath();
        context.moveTo(230,230);
        context.lineTo(200,260);
        context.lineWidth=5;
        context.stroke();
    }
        




 }
