// Variables 

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');

let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
     // Cuando agregar un curso al presionar el boton "Agregar al Carrito"
     listaCursos.addEventListener('click', agregarCurso);

     //Elimina cursos del carrito
     carrito.addEventListener('click', eliminarCurso);

     //Vaciar el carrito
     vaciarCarritoBtn.addEventListener('click', ()=>{
          articulosCarrito = [];
          limpiarHTML();
     });

};

//Funciones

function agregarCurso(e){
     e.preventDefault();
     if(e.target.classList.contains('agregar-carrito')){
          const seleccionado = e.target.parentElement.parentElement;
          leerDatosCurso(seleccionado);
     }
};

//Eliminar curso del carrito

function eliminarCurso(e){
     if(e.target.classList.contains('borrar-curso')){
          const cursoId = e.target.getAttribute('data-id');
          
          // Si hay mas de 1 curso del mismo tipo, se eliminan de 1 en 1
          articulosCarrito = articulosCarrito.filter( curso => {
               if(curso.id !== cursoId){
                    return curso;
               }else{
                    if(curso.cantidad>1){
                         curso.cantidad--;
                         return curso;
                    }
               }
          });
          carritoHTML();
     }
};

//Lee el contenido del HTML al que le dimos click y extrae la informacion del curso 
function leerDatosCurso(curso){
     const infoCurso = {
          imagen: curso.querySelector('img').src,
          titulo: curso.querySelector('h4').textContent,
          precio: curso.querySelector('.precio span').textContent,
          id: curso.querySelector('a').getAttribute('data-id'),
          cantidad: 1,
     }

     //Revisa si un elemento ya existe en el carrito
     const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
     if(existe){
          const cursos = articulosCarrito.map( curso => {
               if(curso.id === infoCurso.id){
                    curso.cantidad++;
                    return curso; // retorna el objeto actualizado
               }else{
                    return curso; 
               }
          })
          articulosCarrito = [...cursos];
     }else{
          articulosCarrito = [...articulosCarrito, infoCurso];
     }
     
     // Agrega elementos al arreglo de carrito

     console.log(articulosCarrito);

     carritoHTML();
}

//Muestra el Carrito de compras en el HTML

function carritoHTML(){

     //Limpiar el HTML 
     limpiarHTML();

     //Recorre el carrito y genera el HTML
     articulosCarrito.forEach( curso => {
          const {imagen, titulo, precio, cantidad, id} = curso;
          const row = document.createElement('tr');
          row.innerHTML = `
               <td>
                    <img src="${imagen}" width=100/>
               </td>
               <td>
                    ${titulo}
               </td>
               <td>
                    ${precio}
               </td>
               <td>
                    ${cantidad}
               </td>
               <td>
                    <a href="#" class="borrar-curso" data-id="${id}"> X </a>
               </td>
          `;

          //Agrega el HTML del carrito en el tbody
          contenedorCarrito.appendChild(row);
     })
};

function limpiarHTML(){
     // contenedorCarrito.innerHTML = '';

     //while es mas rapido
     while(contenedorCarrito.firstChild){
          contenedorCarrito.removeChild(contenedorCarrito.firstChild);
     }
};

