import { usuariosServices } from "../../servicios/usuarios-servicios.js";
import { newRegister } from "./new.js";
import { editRegister } from "./new.js";

var dtable;

const htmlUsuarios = 
`<div class="card">
   <div class="card-header">
    <h3 class="card-title">
        <div class="d-flex flex-wrap">
            <a class="btn bg-dark btn-sm me-2 mb-2 btnAgregarUsuario" href="#/newUsuario">Agregar Usuario</a>
            <button class="btn bg-dark btn-sm me-2 mb-2 btnHistorialViaje">Historial de Viaje</button>
            <button class="btn bg-dark btn-sm mb-2 btnReservaActiva">Reserva Activa por Usuario</button>
        </div>
    </h3>
   </div>
   <div class="card-body">            
     <table id="usuariosTable" class="table table-bordered table-striped tableUsuario" width="100%">
         <thead>
             <tr>
             <th># </th>
             <th>Apellido</th>
             <th>Nombre</th>
             <th>Correo</th>
             <th>Rol</th>
             <th>Acciones</th>
             </tr>
         </thead>
     </table>
   </div>
</div>`; 

export async function Usuarios(){
    let d = document;
    const spinner = document.getElementById("spinner");
    d.querySelector('.contenidoTitulo').innerHTML = 'Usuarios';
    d.querySelector('.contenidoTituloSec').innerHTML = '';
    d.querySelector('.rutaMenu').innerHTML = "Usuarios";
    d.querySelector('.rutaMenu').setAttribute('href',"#/usuarios");
    let cP = d.getElementById('contenidoPrincipal');

    spinner.classList.add("d-flex"); 

    let res = await usuariosServices.listar();

    res.forEach(element => {
      element.action = `
        <div class='btn-group'>
          <a class='btn btn-warning btn-sm mr-1 rounded-circle btnEditarUsuario' href='#/editUsuario' data-idUsuario='${element.id}'>
            <i class='fas fa-pencil-alt'></i>
          </a>
          <a class='btn btn-danger btn-sm rounded-circle btnBorrarUsuario' href='#/delUsuario' data-idUsuario='${element.id}'>
            <i class='fas fa-trash'></i>
          </a>
        </div>`;
    });  

    // 👉 Primero insertás el HTML
    cP.innerHTML = htmlUsuarios;
    llenarTabla(res);

    // 👉 Y luego enganchás los botones que ahora sí existen en el DOM
    d.querySelector(".btnAgregarUsuario").addEventListener("click", agregar);
    d.querySelector(".btnHistorialViaje").addEventListener("click", async () => {
        const idUsuario = prompt("Ingrese el ID del usuario para ver su historial de viajes:");
        if (!idUsuario) return alert("ID de usuario requerido");

        try {
            const historial = await usuariosServices.getHistorialViajesPorUsuario(idUsuario);
            mostrarHistorial(historial);
        } catch (error) {
            console.error("Error obteniendo historial:", error);
            alert("Error al obtener el historial de viajes");
        }
    });

    spinner.classList.replace("d-flex", "d-none");   
}


function enlazarEventos(){
    let d = document;
    d.querySelectorAll(".btnEditarUsuario").forEach(btn => btn.addEventListener("click", editar));
    d.querySelectorAll(".btnBorrarUsuario").forEach(btn => btn.addEventListener("click", borrar));
}

function agregar(){
    newRegister();
}

function editar(){
    let id = this.getAttribute('data-idUsuario');
    editRegister(id);
}

async function borrar(){
    let id = this.getAttribute('data-idUsuario');
    let borrar = false;

    await Swal.fire({
        title: '¿Está seguro que desea eliminar el registro?',
        showDenyButton: true,
        confirmButtonText: 'Sí',
        denyButtonText: 'Cancelar',
        focusDeny: true
    }).then((result) => {
        if (result.isConfirmed) borrar = true;
        else Swal.fire('Se canceló la eliminación', '', 'info');
    });

    if (borrar) {
        await usuariosServices.borrar(id); 
        window.location.href = "#/usuarios";  
    }
}

function llenarTabla(res){ 
    dtable = new DataTable('#usuariosTable', {
        responsive: true,
        data: res,
        columns: [
            { data: 'id' },
            { data: 'apellido' },
            { data: 'nombre' },
            { data: 'correo' },
            { data: 'role' },
            { data: 'action', orderable: false }
        ],
        fnDrawCallback: enlazarEventos,
        deferRender: true,
        retrieve: true,
        processing: true,
        language: {
            sProcessing: "Procesando...",
            sLengthMenu: "Mostrar _MENU_ registros",
            sZeroRecords: "No se encontraron resultados",
            sEmptyTable: "Ningún dato disponible en esta tabla",
            sInfo: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
            sInfoEmpty: "Mostrando registros del 0 al 0 de un total de 0",
            sInfoFiltered: "(filtrado de un total de _MAX_ registros)",
            sSearch: "Buscar:",
            oPaginate: {
                sFirst: "Primero",
                sLast: "Último",
                sNext: "Siguiente",
                sPrevious: "Anterior"
            }
        }
    });
}

function mostrarHistorial(historial) {
    let d = document;

    // Si ya existe, elimino tabla previa
    const contAnterior = d.getElementById('historialContainer');
    if (contAnterior) contAnterior.remove();

    // Creo un contenedor para la tabla
    const container = d.createElement('div');
    container.id = 'historialContainer';
    container.className = 'card mt-3';

    let tablaHTML = `
        <div class="card-header"><h3 class="card-title">Historial de Viajes</h3></div>
        <div class="card-body table-responsive p-0" style="max-height: 400px;">
        <table class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Paquete</th>
                    <th>Destino</th>
                    <th>Fecha Inicio</th>
                    <th>Fecha Fin</th>
                    <th>Fecha Reserva</th>
                    <th>Cantidad Personas</th>
                </tr>
            </thead>
            <tbody>
    `;

    if (historial.length === 0) {
        tablaHTML += `<tr><td colspan="8" class="text-center">No hay historial para este usuario.</td></tr>`;
    } else {
        historial.forEach(item => {
            tablaHTML += `
                <tr>
                    <td>${item.nombre}</td>
                    <td>${item.apellido}</td>
                    <td>${item.paquete_nombre}</td>
                    <td>${item.destino_nombre}</td>
                    <td>${item.fecha_inicio ?? ''}</td>
                    <td>${item.fecha_fin ?? ''}</td>
                    <td>${item.fecha_reserva ?? ''}</td>
                    <td>${item.cantidad_personas ?? ''}</td>
                </tr>
            `;
        });
    }

    tablaHTML += `
            </tbody>
        </table>
        </div>
    `;

    container.innerHTML = tablaHTML;

    // Lo inserto debajo de la tabla de usuarios
    const cP = d.getElementById('contenidoPrincipal');
    cP.appendChild(container);
}