import { Home } from "./home/home.js";
import { Paquetes } from "./paquetes/paquetes.js";
import { Usuarios } from "./usuarios/usuarios.js";
import { Registro } from "./publico/registro.js";
import { Destinos } from "./destinos/destinos.js";
import { Reservas } from "./reservas/reservas.js";

export function Router() {
    let hash = location.hash;
    let origen = document.querySelector("a[href^='" + hash + "']");
    if (origen) {
        if (origen.className.indexOf('nav-link') >= 0) {
            document.querySelector('.nav-item .active')?.classList.remove('active');
            document.querySelector("a[href^='" + hash + "']").classList.add('active');
        }
    }

    if (hash === '#/usuarios') {
        Usuarios();
<<<<<<< HEAD
    } else if (hash === '#/destinos') {
        Destinos();
    } else if (hash === '#/reservas') {
        Reservas();
    } else if (hash === '#/register') {
=======
    } else if(hash === '#/categorias'){
        Categorias();
    // } else if(hash === '#/productos'){
    //     Productos();
    } else if(hash === '#/destinos'){
        Destinos();
    // } else if(hash === '#/ventas'){
    //     Ventas();
    }else if(hash==='#/reservas'){
        Reservas();
    } else if(hash === '#/register'){         
>>>>>>> 00142904fbea67cc287c098406e1b8678ca124cf
        console.log('Register route called');
        Registro();
    } else if ((hash === '#/home') || (hash === '') || (hash === '#/')) {
        Home();
    } else if (hash === '#/paquetes') {
        Paquetes();
    }
    console.log('Current hash:', hash);
}

