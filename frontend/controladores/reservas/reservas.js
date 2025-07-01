import { reservasServices } from "../../servicios/reservas-servicios.js";
<<<<<<< HEAD
import { newRegister } from "./new.js";
import { editRegister } from "./new.js";

const htmlReservas = `
<div class="card">
    <div class="card-header">
        <h3 class="card-title">
            <a class="btn bg-dark btn-sm btnAgregarReserva" href="#/newReserva">Agregar Reserva</a>
        </h3>
    </div>
    <div class="card-body">
        <table id="reservasTable" class="table table-bordered table-striped" width="100%">
            <thead>
                <tr>
                    <th>#</th>
                    <th>ID Usuario</th>
                    <th>ID Paquete</th>
                    <th>Personas</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
        </table>
    </div>
</div>
`;

export async function Reservas() {
    console.log("Reservas ejecutado");
    const d = document;
    const spinner = document.getElementById("spinner");
    d.querySelector(".contenidoTitulo").innerHTML = "Reservas";
    d.querySelector(".contenidoTituloSec").innerHTML = "";
    d.querySelector(".rutaMenu").innerHTML = "Reservas";
    d.querySelector(".rutaMenu").setAttribute("href", "#/reservas");
    const cP = document.getElementById("contenidoPrincipal");

    spinner.classList.add("d-flex");

    try {
        const res = await reservasServices.listar();
        res.forEach(r => {
            r.estado = `<input type="checkbox" class="ckboxEstado" data-idreserva="${r.id}" ${r.estado ? "checked" : ""}>`;
            r.action = `
                <div class='btn-group'>
                    <a class='btn btn-warning btn-sm mr-1 rounded-circle btnEditarReserva' href='#/editReserva' data-idreserva='${r.id}'>
                        <i class='fas fa-pencil-alt'></i>
                    </a>
                    <a class='btn btn-danger btn-sm rounded-circle btnBorrarReserva' href='#/delReserva' data-idreserva='${r.id}'>
                        <i class='fas fa-trash'></i>
                    </a>
                </div>`;
=======

const htmlReservas = `
<div class="card">
   <div class="card-header">
       <h3 class="card-title">Reservas</h3>
   </div>
   <div class="card-body">            
       <table id="reservasTable" class="table table-bordered table-striped" width="100%">
           <thead>
               <tr>
                   <th>#</th>
                   <th>ID Usuario</th>
                   <th>ID Paquete</th>
                   <th>Personas</th>
                   <th>Fecha</th>
                   <th>Estado</th>
               </tr>
           </thead>
       </table>
   </div>
</div>`;

export async function Reservas() {
    const d = document;
    const spinner = document.getElementById("spinner");
    d.querySelector('.contenidoTitulo').innerHTML = 'Reservas';
    d.querySelector('.rutaMenu').innerHTML = "Reservas";
    d.querySelector('.rutaMenu').setAttribute('href', "#/reservas");
    const cP = d.getElementById('contenidoPrincipal');

    spinner.classList.add("d-flex");
    try {
        const res = await reservasServices.listar();

        // Añadimos un campo para checkbox con estado
        res.forEach(r => {
            r.action = `<input type="checkbox" class="ckboxEstado" data-idreserva="${r.id}" ${r.estado ? "checked" : ""}>`;
>>>>>>> 00142904fbea67cc287c098406e1b8678ca124cf
        });

        cP.innerHTML = htmlReservas;
        llenarTabla(res);
<<<<<<< HEAD
        document.querySelector(".btnAgregarReserva").addEventListener("click", agregar);

=======
>>>>>>> 00142904fbea67cc287c098406e1b8678ca124cf
    } catch (error) {
        console.error("Error cargando reservas:", error);
        cP.innerHTML = `<div class="alert alert-danger">Error cargando reservas.</div>`;
    } finally {
        spinner.classList.replace("d-flex", "d-none");
    }
}

<<<<<<< HEAD
function agregar() {
    newRegister();
}

function editar() {
    const id = this.getAttribute("data-idreserva");
    editRegister(id);
}

async function borrar() {
    const id = this.getAttribute("data-idreserva");
    let borrar = 0;

    await Swal.fire({
        title: 'Está seguro que desea eliminar el registro?',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `Cancelar`,
        focusDeny: true
    }).then((result) => {
        if (result.isConfirmed) {
            borrar = 1;
        } else {
            Swal.fire('Se canceló la eliminación', '', 'info');
        }
    });

    if (borrar === 1) {
        await reservasServices.borrar(id);
        window.location.href = "#/reservas";
    }
}

function chkBoxChange(event) {
    const id = event.target.getAttribute("data-idreserva");
    const estado = event.target.checked;

    reservasServices.listar(id).then(reserva => {
        reserva.estado = estado;
        reservasServices.editar(id, reserva).catch(err => {
            console.error("Error actualizando estado:", err);
            alert("No se pudo actualizar el estado");
            event.target.checked = !estado;
        });
    }).catch(err => {
        console.error("Error obteniendo reserva:", err);
        alert("No se pudo obtener la reserva");
=======
function chkBoxChange(event) {
    const id = event.target.getAttribute('data-idreserva');
    const estado = event.target.checked;

    // Obtener la reserva completa para enviar el objeto actualizado
    reservasServices.listar(id).then(reservaCompleta => {
        reservaCompleta.estado = estado;
        reservasServices.editar(id, reservaCompleta)
            .catch(err => {
                console.error("Error actualizando estado:", err);
                alert("No se pudo actualizar el estado");
                // opcional: revertir checkbox
                event.target.checked = !estado;
            });
    }).catch(err => {
        console.error("Error obteniendo reserva:", err);
        alert("No se pudo obtener la reserva");
        // revertir checkbox
>>>>>>> 00142904fbea67cc287c098406e1b8678ca124cf
        event.target.checked = !estado;
    });
}

function enlazarEventos() {
<<<<<<< HEAD
    const d = document;
    const editarBtns = d.querySelectorAll(".btnEditarReserva");
    const borrarBtns = d.querySelectorAll(".btnBorrarReserva");
    const chkEstados = d.querySelectorAll(".ckboxEstado");

    editarBtns.forEach(btn => btn.addEventListener("click", editar));
    borrarBtns.forEach(btn => btn.addEventListener("click", borrar));
    chkEstados.forEach(ck => ck.addEventListener("change", chkBoxChange));
}

function llenarTabla(res) {
    new DataTable("#reservasTable", {
        responsive: true,
        data: res,
        columns: [
            { data: "id" },
            { data: "idUsuario" },
            { data: "idPaquete" },
            { data: "cantidad_personas" },
            { data: "fecha_reserva" },
            { data: "estado", orderable: false },
            { data: "action", orderable: false }
        ],
        fnDrawCallback: enlazarEventos,
        deferRender: true,
        retrive: true,
        processing: true,
=======
    document.querySelectorAll(".ckboxEstado").forEach(chk => {
        chk.addEventListener("change", chkBoxChange);
    });
}

function llenarTabla(res) {
    new DataTable('#reservasTable', {
        responsive: true,
        data: res,
        columns: [
            { data: 'id' },
            { data: 'idUsuario' },
            { data: 'idPaquete' },
            { data: 'cantidad_personas' },
            { data: 'fecha_reserva' },
            { data: 'action', orderable: false }
        ],
        fnDrawCallback: enlazarEventos,
>>>>>>> 00142904fbea67cc287c098406e1b8678ca124cf
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
<<<<<<< HEAD
            },
            oAria: {
                sSortAscending: ": Activar para ordenar ascendente",
                sSortDescending: ": Activar para ordenar descendente"
=======
>>>>>>> 00142904fbea67cc287c098406e1b8678ca124cf
            }
        }
    });
}
<<<<<<< HEAD
//01-07-2024 
=======
>>>>>>> 00142904fbea67cc287c098406e1b8678ca124cf
