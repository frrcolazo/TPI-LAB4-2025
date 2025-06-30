const url = "http://127.0.0.1:8000/destinos";

async function listar(id) {
    let cadUrl;
    if(isNaN(id))
      cadUrl= url;
    else 
      cadUrl = url + "/" + id;  
    return await fetch(cadUrl,{
        headers: {
            "accept": "application/json",
            "Content-type": "application/json"
            // "Authorization": "Bearer " + localStorage.getItem('token') 
        }
    })
    .then(respuesta => respuesta.json());
}
async function obtenerTotalDestinos() {
    const urlTotal = url + "/total";
    return await fetch(urlTotal, {
        headers: {
            "Accept": "application/json"
        }
    })
    .then(respuesta => respuesta.json());
}

async function crear({ nombre, descripcion, pais }) {
    return await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre,
            descripcion,
            pais
        })
    })
    .then(respuesta => respuesta.json());
}

async function editar(id, { nombre, descripcion, pais }) {
    let urlPut = url + "/" + id;
    return await fetch(urlPut, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre,
            descripcion,
            pais
        })
    })
    .then(respuesta => respuesta.json());
}

async function borrar(id){
    let urlPut = url + "/" + id;
    return await fetch(urlPut, {
            method: 'DELETE'
       })
       .then(respuesta => respuesta.json());
}

export const destinosServices = {
    listar,
    crear,
    editar,
    borrar,
    obtenerTotalDestinos
}