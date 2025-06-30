import { reservasServices } from "/servicios/reservas-servicios.js";

const htmlAmReservas = `
<div class="card card-dark card-outline">
    <form class="needs-validation frmAmReserva" novalidate>
        <div class="card-header">
            <div class="col-md-8 offset-md-2">
                <div class="form-group mt-3">
                    <label>ID Usuario</label>
                    <input type="number" class="form-control" name="idUsuario" id="reservaUsuario" required>
                    <div class="invalid-feedback">Requerido.</div>
                </div>
                <div class="form-group mt-3">
                    <label>ID Paquete</label>
                    <input type="number" class="form-control" name="idPaquete" id="reservaPaquete" required>
                    <div class="invalid-feedback">Requerido.</div>
                </div>
                <div class="form-group mt-3">
                    <label>Cantidad de personas</label>
                    <input type="number" class="form-control" name="cantidad_personas" id="reservaCantidad" required>
                    <div class="invalid-feedback">Requerido.</div>
                </div>
                <div class="form-group mt-3">
                    <label>Fecha de reserva</label>
                    <input type="date" class="form-control" name="fecha_reserva" id="reservaFecha" required>
                    <div class="invalid-feedback">Requerido.</div>
                </div>
                <div class="form-group mt-3">
                    <label>Estado</label>
                    <select class="form-control" name="estado" id="reservaEstado" required>
                        <option value="">Seleccione</option>
                        <option value="true">Activa</option>
                        <option value="false">Inactiva</option>
                    </select>
                    <div class="invalid-feedback">Requerido.</div>
                </div>
            </div>
        </div>
        <div class="card-footer">
            <div class="col-md-8 offset-md-2">
                <div class="form-group mt-3">
                    <a href="#/reservas" class="btn btn-light border text-left">Cancelar</a>
                    <button type="submit" class="btn bg-dark float-right">Guardar</button>
                </div>
            </div>
        </div>
    </form>
</div>
`;

let formulario;
let txtUsuario, txtPaquete, txtCantidad, txtFecha, selEstado;
let idReserva = null;

export async function newRegister() {
    let d = document;
    d.querySelector('.contenidoTitulo').innerHTML = 'Agregar Reserva';
    d.querySelector('.contenidoTituloSec').innerHTML = 'Nueva';
    crearFormulario();

    formulario = d.querySelector(".frmAmReserva");
    formulario.addEventListener("submit", guardar);
}

export async function editRegister(id) {
    let d = document;
    idReserva = id;
    d.querySelector('.contenidoTitulo').innerHTML = 'Editar Reserva';
    d.querySelector('.contenidoTituloSec').innerHTML = 'Editar';
    crearFormulario();

    formulario = d.querySelector(".frmAmReserva");
    formulario.addEventListener("submit", modificar);

    try {
        const reserva = await reservasServices.listar(id);
        txtUsuario.value = reserva.idUsuario;
        txtPaquete.value = reserva.idPaquete;
        txtCantidad.value = reserva.cantidad_personas;
        txtFecha.value = reserva.fecha_reserva;
        selEstado.value = reserva.estado ? "true" : "false";
    } catch (error) {
        console.error("Error cargando reserva:", error);
        alert("Error al cargar la reserva");
        window.location.href = "#/reservas";
    }
}

function crearFormulario() {
    const d = document;
    d.querySelector('.rutaMenu').innerHTML = "Reservas";
    d.querySelector('.rutaMenu').setAttribute('href', "#/reservas");

    const cP = d.getElementById('contenidoPrincipal');
    cP.innerHTML = htmlAmReservas;

    txtUsuario = d.getElementById('reservaUsuario');
    txtPaquete = d.getElementById('reservaPaquete');
    txtCantidad = d.getElementById('reservaCantidad');
    txtFecha = d.getElementById('reservaFecha');
    selEstado = d.getElementById('reservaEstado');
}

function guardar(e) {
    e.preventDefault();
    if (!formulario.checkValidity()) {
        formulario.classList.add('was-validated');
        return;
    }

    reservasServices.crear(
        parseInt(txtUsuario.value),
        parseInt(txtPaquete.value),
        parseInt(txtCantidad.value),
        txtFecha.value,
        selEstado.value === "true"
    )
    .then(() => {
        formulario.reset();
        window.location.href = "#/reservas";
    })
    .catch(error => console.error("Error creando reserva:", error));
}

function modificar(e) {
    e.preventDefault();
    if (!formulario.checkValidity()) {
        formulario.classList.add('was-validated');
        return;
    }

    const reservaActualizada = {
        idUsuario: parseInt(txtUsuario.value),
        idPaquete: parseInt(txtPaquete.value),
        cantidad_personas: parseInt(txtCantidad.value),
        fecha_reserva: txtFecha.value,
        estado: selEstado.value === "true"
    };

    reservasServices.editar(idReserva, reservaActualizada)
        .then(() => {
            formulario.reset();
            window.location.href = "#/reservas";
        })
        .catch(error => console.error("Error actualizando reserva:", error));
}