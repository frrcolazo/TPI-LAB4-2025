import { usuariosServices } from "../../servicios/usuarios-servicios.js";
import { paquetesServices } from "../../servicios/paquetes-servicios.js";
import { destinosServices } from "../../servicios/destinos-servicios.js";
import { reservasServices } from "../../servicios/reservas-servicios.js";
const htmlHome =
    ` <div class="row" >
    <div class="col-lg-3 col-6">
        <!-- small box -->
        <div class="small-box bg-info">
            <div class="inner">
            <h3 id="indDestinos">150</h3>

            <p>Cantidad de destinos disponibles</p>
            </div>
            <div class="icon">
                <i class="ion ion-bag"></i>
            </div>
            <a href="#/destinos" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
        </div>
    </div>
    <!-- ./col -->
    <div class="col-lg-3 col-6">
        <!-- small box -->
        <div class="small-box bg-success">
            <div class="inner">
            <h3 id="indReservas">53</h3>

            <p>Cantidad Reservas Activas</p>
            </div>
            <div class="icon">
            <i class="ion ion-stats-bars"></i>
            </div>
            <a href="#/reservas" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
        </div>
    </div>
    <!-- ./col -->
    <div class="col-lg-3 col-6">
        <!-- small box -->
        <div class="small-box bg-warning">
            <div class="inner">
            <h3 id="cantReservasUsuario">0</h3>

            <p id="nombreUsuarioTop">Usuario</p>  
            <small style="font-size: 0.9rem; color: #444;">Top en reservas</small>
            </div>
            <div class="icon">
            <i class="ion ion-person-add"></i>
            </div>
            <a href="#/usuarios" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
        </div>
    </div>
    <!-- ./col -->
    <div class="col-lg-3 col-6">
        <!-- small box -->
        <div class="small-box bg-danger">
            <div class="inner">
            <h3 id="indPaquetes">65</h3>

            <p>Paquete más reservado</p>
            </div>
            <div class="icon">
            <i class="ion ion-pie-graph"></i>
            </div>
            <a href="#/paquetes" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
        </div>
    </div>
    <!-- ./col -->
</div>`

export async function Home() {
    const d = document;
    const spinner = d.getElementById("spinner");

    d.querySelector('.contenidoTitulo').innerHTML = 'Home';
    d.querySelector('.contenidoTituloSec').innerHTML = '';
    d.querySelector('.rutaMenu').innerHTML = "Home";
    d.querySelector('.rutaMenu').setAttribute('href', "#/home");

    const cP = d.getElementById('contenidoPrincipal');
    cP.innerHTML = htmlHome;

    const indDestinos = d.getElementById("indDestinos");
    const indReservas = d.getElementById("indReservas");
    const cantReservasUsuario = d.getElementById("cantReservasUsuario");
    const nombreUsuarioTop = d.getElementById("nombreUsuarioTop");
    const indPaquetes = d.getElementById("indPaquetes");

    try {
        spinner.classList.add("d-flex");

        // Usuario con más reservas
        const resUsuario = await usuariosServices.listarTopReserva();
        cantReservasUsuario.innerHTML = resUsuario?.cantidad_reservas ?? 0;
        nombreUsuarioTop.innerHTML = resUsuario?.nombre ?? "No hay datos";

        // Cantidad de ventas
        const resDestinos = await destinosServices.obtenerTotalDestinos();
        indDestinos.innerHTML = resDestinos.total_destinos ?? 0;

        // Cantidad de ventas sin despachar
        const resReservas = await reservasServices.obtenerTotalReservasActivas();
        indReservas.innerHTML = resReservas.total_reservas_activas ?? 0;

        const paqueteMasReservado = await paquetesServices.obtenerPaqueteMasReservado();
        indPaquetes.innerHTML = paqueteMasReservado?.nombre ?? "Sin datos";

    } catch (error) {
        console.error("Error cargando datos Home:", error);

        cantReservasUsuario.innerHTML = 0;
        nombreUsuarioTop.innerHTML = "Error";
        indDestinos.innerHTML = 0;
        indReservas.innerHTML = 0;
        indPaquetes.innerHTML = 0;
    } finally {
        spinner.classList.replace("d-flex", "d-none");
    }
}
