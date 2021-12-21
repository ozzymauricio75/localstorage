//Variables
const fomrulario  = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets        = [];

//Event Listeners
eventListeners();

function eventListeners(){
    //Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    //Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];

        console.log(tweets);

        crearHTML();
    } );
}

//Funciones
function agregarTweet(e) {
    e.preventDefault();

    //Textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    //Validacion
    if(tweet === ''){
        mostrarError("El campo no puede ir vacio");
        return; //Evita que se ejecuten mas lineas de codigo
    } 
    
    const tweetObj = {
        id:    Date.now(),
        tweet: tweet,
    }
    
    //Anadir al arreglo de Tweets
    tweets = [...tweets, tweetObj];

    //Una vez agregado vamos a crear el HTML
    crearHTML();

    //Limpiar el formulario
    formulario.reset();

}

//Mostrar error
function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //Insertar mensaje en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //Elimina la alerta despues de tres segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);

}

//Muestra el listado de los tweet
function crearHTML() {
    
    limpìarHTML();

    if (tweets.length > 0) {
        tweets.forEach(tweet => {
          
          //Agregar boton eliminar
          const btnEliminar = document.createElement('a');
          btnEliminar.classList.add('borrar-tweet');
          btnEliminar.innerText = 'X';   

          //Añadir la funcion de eliminar
          btnEliminar.onclick = () => {
              borrarTweet(tweet.id);
          }

          //Crear todo el HTML
          const li = document.createElement('li');  

          //Añadir texto
          li.innerText = tweet.tweet;

          //Boton eliminar
          li.appendChild(btnEliminar);

          //Insertarlo en el HTML
          listaTweets.appendChild(li);
        })
    }

    sincronizarStorage();
}

//Agregar los Tweets al localStorage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

//Elimina el tweet
function borrarTweet(id) {
    tweets = tweets.filter( tweet => tweet.id !== id);
    crearHTML();
}
//Limpiar HTML
function limpìarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}