import { reservasServices } from "../../servicios/reservas-servicios.js";

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
    const res = await reservasServices.listar();

    res.forEach(r => {
        r.action = `<input type="checkbox" class="ckboxEstado" data-idReserva=${r.id} ${r.estado ? "checked" : ""}>`;
    });

    cP.innerHTML = htmlReservas;
    llenarTabla(res);
    spinner.classList.replace("d-flex", "d-none");
}

function chkBoxChange(event) {
    const id = event.target.getAttribute('data-idreserva');
    const estado = event.target.checked;
    reservasServices.editar(id, estado);
}

function enlazarEventos() {
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