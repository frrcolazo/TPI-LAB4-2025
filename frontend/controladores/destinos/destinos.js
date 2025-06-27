import { destinosServices } from "../../servicios/destinos-servicios.js";
import { newRegister } from "./new.js";
import { editRegister } from "./new.js";

const htmlDestinos = 
`<div class="card">
   <div class="card-header">
   <h3 class="card-title"> 
       <a class="btn bg-dark btn-sm btnAgregarDestino" href="#/newDestino">Agregar Destino</a>
   </h3>
   </div>
   <!-- /.card-header -->
   <div class="card-body">            
   <table id="destinosTable" class="table table-bordered table-striped tableDestino" width="100%">
       <thead>
           <tr>
           <th>#</th>
           <th>Nombre</th>
           <th>Descripción</th>
           <th>País</th>
           <th>Acciones</th>
           </tr>
       </thead>
   </table>
   </div>
   <!-- /.card-body -->
</div> `; 

export async function Destinos(){
    console.log("Destinos ejecutado");
    let d = document
    const spinner = document.getElementById("spinner");
    let res='';
    d.querySelector('.contenidoTitulo').innerHTML = 'Destinos';
    d.querySelector('.contenidoTituloSec').innerHTML = '';
    d.querySelector('.rutaMenu').innerHTML = "Destinos";
    d.querySelector('.rutaMenu').setAttribute('href',"#/destinos");
    let cP =d.getElementById('contenidoPrincipal');
    //Muestro spinner
    spinner.classList.add ( "d-flex");  
    res = await destinosServices.listar();
    res.forEach(element => {
      element.action = "<div class='btn-group'><a class='btn btn-warning btn-sm mr-1 rounded-circle btnEditarDestino'  href='#/editDestino' data-idDestino='"+ element.id +"'> <i class='fas fa-pencil-alt'></i></a><a class='btn btn-danger btn-sm rounded-circle removeItem btnBorrarDestino'href='#/delDestino' data-idDestino='"+ element.id +"'><i class='fas fa-trash'></i></a></div>";
    });  
    cP.innerHTML =  htmlDestinos;
    llenarTabla(res);
    let btnAgregar = d.querySelector(".btnAgregarDestino");
    btnAgregar.addEventListener("click", agregar);
    //Oculto spinner  
    spinner.classList.replace("d-flex", "d-none");    
}

function enlazarEventos( oSettings){
    let d = document;
    let btnEditar = d.querySelectorAll(".btnEditarDestino");
    let btnBorrar = d.querySelectorAll(".btnBorrarDestino");
    for(let i=0 ; i< btnEditar.length ; i++){
        btnEditar[i].addEventListener("click", editar);
        btnBorrar[i].addEventListener("click", borrar);
    }    
}

function agregar(){
    newRegister();
}
function editar(){
   let id = this.getAttribute('data-idDestino') ;
   editRegister(id);
}

async function borrar(){
    let id = this.getAttribute('data-idDestino') ;
    let borrar=0;
  await Swal.fire({
        title: 'Está seguro que desea eliminar el registro?',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `Cancelar`,
        focusDeny: true
      }).then((result) => {
        if (result.isConfirmed) {
           borrar = 1;
        } else if (result.isDenied) {
           borrar = 0 ;
           Swal.fire('Se canceló la eliminación', '', 'info');
        }
      })
      if (borrar === 1)
            await destinosServices.borrar(id); 
      window.location.href = "#/destinos";  
}

function llenarTabla(res){ 
    new DataTable('#destinosTable', {
        responsive:true,
        data : res,
        columns: [
            { data: 'id' },    
            { data: 'nombre' },
            { data: 'descripcion' },
            { data: 'pais' },
            { data: 'action', "orderable":false }
        ],
        fnDrawCallback: function ( oSettings) {
            enlazarEventos( oSettings); },
        deferRender: true,
        retrive: true,
        processing: true,
        language: {
            sProcessing:     "Procesando...",
            sLengthMenu:     "Mostrar _MENU_ registros",
            sZeroRecords:    "No se encontraron resultados",
            sEmptyTable:     "Ningún dato disponible en esta tabla",
            sInfo:           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
            sInfoEmpty:      "Mostrando registros del 0 al 0 de un total de 0",
            sInfoFiltered:   "(filtrado de un total de _MAX_ registros)",
            sInfoPostFix:    "",
            sSearch:         "Buscar:",
            sUrl:            "",
            sInfoThousands:  ",",
            sLoadingRecords: "Cargando...",
            oPaginate: {
                sFirst:    "Primero",
                sLast:     "Último",
                sNext:     "Siguiente",
                sPrevious: "Anterior"
            },
            oAria: {
                sSortAscending:  ": Activar para ordenar la columna de manera ascendente",
                sSortDescending: ": Activar para ordenar la columna de manera descendente"
            }
        }                           
    });
}