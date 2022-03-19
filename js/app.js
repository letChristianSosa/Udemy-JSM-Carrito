// Variables 

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');

cargarEventListeners();
function cargarEventListeners(){
     // Cuando agregar un curso al presionar el boton "Agregar al Carrito"
     listaCursos.addEventListener('click', agregarCurso);

};

//Funciones

function agregarCurso(e){
     e.preventDefault();
     if(e.target.classList.contains('agregar-carrito')){
          const seleccionado = e.target.parentElement.parentElement;
          leerDatosCurso(seleccionado);
     }
}

//Lee el contenido del HTML al que le dimos click y extrae la informacion del curso 
function leerDatosCurso(curso){
     const infoCurso = {
          imagen: curso.querySelector('img').src,
          titulo: curso.querySelector('h4').textContent,
          precio: curso.querySelector('.precio span').textContent,
          id: curso.querySelector('a').getAttribute('data-id'),
          cantidad: 1,
     }
     console.log(infoCurso);
}


