window.addEventListener('load', () => {
  
  const nameInput = document.querySelector('#name');

  const username = localStorage.getItem('username');

  nameInput.value = username;

  nameInput.addEventListener('change', e => {
      localStorage.setItem('username', e.target.value);
  })
})

const fecha = document.querySelector('#fecha');
const lista = document.querySelector('#list');
const input = document.querySelector('#input');
const botonEnter = document.querySelector('#botton-enter');
const check = 'src="assets/radio-circle-on.svg"'
const uncheck = "src='assets/radio-circle-off.svg'"
const lineTrough = "line-through"
let id;
let LIST;



// creacion de fecha

const FECHA = new Date()
fecha.innerHTML = FECHA.toLocaleDateString('es-MX', {weekday:'long', month: 'short', day: 'numeric'})


// funcion agregar tarea

function agregarTarea (tarea, id, realizado, eliminado) {
  if (eliminado) {return}
  const REALIZADO = realizado ? check : uncheck;
  const LINE = realizado ? lineTrough : '';
  const elemento = `
        <li id="elemento">
          <img id="${id}" data="realizado" onmouseout="this.src=${REALIZADO};" ${REALIZADO} onmouseover="this.src='assets/cursor-cicle.svg';" >
          <p class="text ${LINE}">${tarea}</p>
          <img id="${id}" data="eliminado" onmouseout="this.src='assets/trash.svg';" src="assets/trash.svg" onmouseover="this.src='assets/trash-delete.svg';" >
        </li>
                    `
    lista.insertAdjacentHTML("afterbegin", elemento)
} 

botonEnter.addEventListener('click', () => {
  const tarea = input.value;
  if (tarea) {
    agregarTarea(tarea, id, false, false)
    LIST.push({
      nombre: tarea,
      id: id,
      ralizado: false,
      eliminado: false
    })
  }
  localStorage.setItem('TODO', JSON.stringify(LIST))

  input.value=''
  id++
})

document.addEventListener('keyup', function(event){
  if(event.key == 'Enter') {
    const tarea = input.value;
    if(tarea) {
      agregarTarea(tarea, id, false, false)
      LIST.push({
        nombre: tarea,
        id: id,
        ralizado: false,
        eliminado: false
      })
    }
    localStorage.setItem('TODO', JSON.stringify(LIST))
    input.value=''
    id++
  }
})


lista.addEventListener('click', function(event) {
  const element = event.target;
  const elementData = element.attributes.data.value;
  if (elementData == "realizado") {
    tareaRealizada(element)
  } else if (elementData == "eliminado") {
    tareaEliminada(element)
  }
  localStorage.setItem('TODO', JSON.stringify(LIST))
})

// TAREA REALIZADA

function tareaRealizada(element) {
  // element.classList.toggle(check);
  // element.classList.toggle(uncheck)
  element.parentNode.querySelector('.text').classList.toggle(lineTrough);
  LIST[element.id].realizado = LIST[element.id].realizado ? false : true
}

// tarea eliminada 

function tareaEliminada(element) {
  element.parentNode.parentNode.removeChild(element.parentNode)
  LIST[element.id].eliminado =  true
}

// local storage GET ITEM


let data = localStorage.getItem('TODO')
if (data){
  LIST = JSON.parse(data)
  id = LIST.length
  cargarLista(LIST)
}else {
  LIST = []
  id = 0
}

function cargarLista(DATA){
  DATA.forEach(function(i){
    agregarTarea(i.nombre, i.id, i.realizado, i.eliminado);
  });
}