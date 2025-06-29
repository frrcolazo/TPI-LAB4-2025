import { paquetesServices } from "../../servicios/paquetes-servicios.js";
import { newRegister } from "./new.js";
import { editRegister } from "./new.js";





export async function Paquetes() {
    let d = document
    const spinner = document.getElementById("spinner");
    let res = '';
    d.querySelector('.contenidoTitulo').innerHTML = 'Paquetes';
    d.querySelector('.contenidoTituloSec').innerHTML = '';
    d.querySelector('.rutaMenu').innerHTML = "Paquetes";
    d.querySelector('.rutaMenu').setAttribute('href', "#/paquetes");
    let cP = d.getElementById('contenidoPrincipal');

    //Muestro spinner
    spinner.classList.add("d-flex");
    res = await paquetesServices.listar();
    res.forEach(element => {
        element.destino = element.destino.descripcion;
        element.action = "<div class='btn-group'><a class='btn btn-warning btn-sm mr-1 rounded-circle btnEditarPaquete'  href='#/editPaquete' data-idPaquete='" + element.id + "'> <i class='fas fa-pencil-alt'></i></a><a class='btn btn-danger btn-sm rounded-circle removeItem btnBorrarPaquete'href='#/delPaquete' data-idPaquete='" + element.id + "'><i class='fas fa-trash'></i></a></div>";
    });

    cP.innerHTML = await fetch('./tabla.html').then(response => response.text())

    llenarTabla(res);

    let btnAgregar = d.querySelector(".btnAgregarPaquete");

    btnAgregar.addEventListener("click", agregar);

    //Oculto spinner  
    spinner.classList.replace("d-flex", "d-none");


}

function enlazarEventos(oSettings) {
    let d = document;
    let btnEditar = d.querySelectorAll(".btnEditarPaquete");
    let btnBorrar = d.querySelectorAll(".btnBorrarPaquete");

    for (let i = 0; i < btnEditar.length; i++) {
        btnEditar[i].addEventListener("click", editar);
        btnBorrar[i].addEventListener("click", borrar);
    }

}

function agregar() {
    newRegister();

}
function editar() {
    let id = this.getAttribute('data-idPaquete');
    editRegister(id);

}

async function borrar() {
    let id = this.getAttribute('data-idPaquete');
    let borrar = 0;
    await Swal.fire({
        title: 'Está seguro que desea eliminar el registro?',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `Cancelar`,

        focusDeny: true
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            borrar = 1;
        } else if (result.isDenied) {
            borrar = 0;
            Swal.fire('Se canceló la eliminación', '', 'info');
        }
    })
    if (borrar === 1)
        await paquetesServices.borrar(id);
    window.location.href = "#/paquetes";
}

function llenarTabla(res) {


    new DataTable('#paquetesTable', {
        responsive: true,
        data: res,
        columns: [
            { data: 'id' },
            { data: 'nombre' },
            { data: 'id_destino' },
            { data: 'precio' },
            { data: 'cupo' },
            { data: 'fecha_inicio' },
            { data: 'fecha_fin' },
            { data: 'destino' },
            { data: 'action', "orderable": false }

        ],
        fnDrawCallback: function (oSettings) {
            enlazarEventos(oSettings);
        },
        deferRender: true,
        retrive: true,
        processing: true,
        language: {
            sProcessing: "Procesando...",
            sLengthMenu: "Mostrar _MENU_ registros",
            sZeroRecords: "No se encontraron resultados",
            sEmptyTable: "Ningún dato disponible en esta tabla",
            sInfo: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
            sInfoEmpty: "Mostrando registros del 0 al 0 de un total de 0",
            sInfoFiltered: "(filtrado de un total de _MAX_ registros)",
            sInfoPostFix: "",
            sSearch: "Buscar:",
            sUrl: "",
            sInfoThousands: ",",
            sLoadingRecords: "Cargando...",
            oPaginate: {
                sFirst: "Primero",
                sLast: "Último",
                sNext: "Siguiente",
                sPrevious: "Anterior"
            },
            oAria: {
                sSortAscending: ": Activar para ordenar la columna de manera ascendente",
                sSortDescending: ": Activar para ordenar la columna de manera descendente"
            }

        }
    });

}
