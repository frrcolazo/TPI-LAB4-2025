/**ESTE MODULO SE ENCARGA DE RENDERIZAR LA PANTALLA DE LOGIN Y DE REGISTRO SEGUN CORRESPONDA */
import { usuariosServices } from "../../../servicios/usuarios-servicios.js";

/**1- Se debe asignar a la siguiente constante todo el código correspondiente al componente de login (/asset/modulos/login.html)  */
const htmlLogin=
`<div class="contenedorLogin">
    <div class="cajaLogin">
        <p >Iniciar sesión</p>

        <form  class="formLogin" >

            <div class="input-group">
                <input type="text" class="form-control" id="regNombre" placeholder="Nombre" name="regNombre" required style="display:none;">
            </div>

            <div class="input-group">
                <input type="text" class="form-control" id="regApellido" placeholder="Apellido" name="regApellido" required style="display:none;">
            </div>

            <div class="input-group">
                <input type="email" class="form-control" id="loginEmail" placeholder="Email" name="loginEmail" autocomplete required>
            </div>

            <div class="input-group">
                <input type="password" class="form-control" id="loginPassword" placeholder="Password" name="loginPassword" autocomplete required>
            </div>

            <div class="input-group">
                <input type="password" class="form-control" id="reLoginPassword" placeholder="Repetir Password" name="reLoginPassword"  required>
            </div>
                        
            <div class="row">
                <div class="col-4">
                <button type="submit"  id="iniciar-sesion" class="btnAmarillo">Login</button>
                </div>
            </div>
        </form>
    </div>
</div>
`;
/*2-Se deben definir 4 variables globales al módulo, una para el formulario html, y otras tres para los inputs de email, contraseña y 
*   repetir contraseña
*/
var formulario;
var inputEmail;
var inputPassword;
var inputRepetirPass;
var inputNombre;
var inputApellido;



export async function login(){
    /** 3- Esta función se encarga de llamar a la función crearFormulario y de enlazar el evento submit del formulario de login
     * 
    */
    crearFormulario();
    formulario.addEventListener("submit", ingresar);
}  

export async function register(){
     /** 4- Esta función se encarga de llamar a la función crearFormulario y de enlazar el evento submit del formulario de registro.
      *     Esta función es similar a la de login, pero en el llamado a la función crearFormulario lo hace pasando el valor true al 
      *     al parámetro registro que espera función mencionada.
      *     Por último enlaza el evento submit del formulario a la función registrarUsuario.
     * 
    */
    crearFormulario(true);

    formulario.addEventListener("submit", registrarUsuario);
}  



function crearFormulario(registrar){
    /**
     * 1- Esta función deberá capturar el elemento cuya clase es .carrusel y le asignará en su interior un blanco para eliminar su contenido previo.
     * 2- Deberá realizar lo mismo para la clase .seccionProductos y .vistaProducto.
     * 3- Luego deberá capturar la .seccionLogin para asignarle el contenido html del componente login, el cual se encuentra previamente 
     *    cargado en la constante htmlLogin.
     * 4- Deberá capturar los id correspondientes a loginEmail, loginPassword y reLoginPassword para asignarlos a las variable definidas
     *    inputEmail, inputPassword e inputRepetirPass.
     * 5- En el caso que el parámetro registrar sea falso deberá eliminar el contenido del elemento id reLoginPassword.
     * 6- Para el caso que el parámetro registrar sea verdadero deberá cambiar el valor de la propiedad css dysplay a block. De esta forma
     *    el input reLoginPassword se mostrará en pantalla.
     * 7- Por último se deberá capturar el formulario indentificado con la clase .formLogin y asignarlo a la variable global formulario.
     */
    let d = document;
    let seccionLogin = d.querySelector(".seccionLogin");
    let carrusel = d.querySelector(".carrusel");
    carrusel.innerHTML = '';
    let seccionPaquetes = d.querySelector(".seccionPaquetes"); // <--- corregido
    seccionPaquetes.innerHTML = '';
    let vistaProducto = d.querySelector(".vistaPaquete");
    vistaProducto.innerHTML = '';
    let seccionInicio = d.querySelector(".seccionInicio"); // <-- AGREGADO
    seccionInicio.innerHTML = ''; // <-- AGREGADO
    
    seccionLogin.innerHTML = htmlLogin;
    inputEmail= d.getElementById("loginEmail");
    inputPassword= d.getElementById("loginPassword");
    inputRepetirPass = d.getElementById("reLoginPassword");
    inputNombre = d.getElementById("regNombre");
    inputApellido = d.getElementById("regApellido");
    
    if (! registrar ){        
        inputRepetirPass.outerHTML = "";
        inputNombre.outerHTML = "";
        inputApellido.outerHTML = "";
    }else{
        inputRepetirPass.style.display ="block";
        inputNombre.style.display ="block";
        inputApellido.style.display ="block";
        d.querySelector(".cajaLogin p").innerHTML = "Registar usuario"
    }
    
    formulario = seccionLogin.querySelector(".formLogin");
} 

async function  ingresar(e){
    /**
     * 1- Esta función tiene como objetivo controlar que el texto en inputEmail e inputPassword se corresponda con alguna cuenta almacenada
     *    en el REST-API.
     * 2- Para ello en primera instancia deberá cancelar el comportamiento por defecto del envento recibido . Para ello deberá
     *    tomar el parámetro evento ( e ) y ejecutar el método preventDefault().
     * 3- Luego se deberá llamar la función llamada usuarioExiste. La misma devuelve un valor falso si el usuario no existe y el id del 
     *    usuario en el caso que la cuenta sea válida.
     * 4- Através de una estructura de desición se deberá, en el caso de que el usuario sea válido :
     *     a- Llamar a la función setUsuarioAutenticado (usuariosServices) pasandole como parámetro el valor true y el id del usuario. De esta forma dicha 
     *        función guardará estos datos en el sessionStorage del navegado, para poder ser consultados en el momento de la compra.
     *     b- Llamar a la función mostrarUsuario, pasandole como parámetro el texto del email de la cuenta.  
     * 5- En el caso de que el usuario no sea válido se deberá mostrar una alerta con el texto 'Email o contraseña incorrecto, intenta nuevamente'.
     */
    e.preventDefault();
    let idUsuario = await usuarioExiste();

    if (idUsuario) {
        setUsuarioAutenticado(true, idUsuario);
        mostrarUsuario(inputEmail.value);

        let seccionLogin = document.querySelector(".seccionLogin");
        if (seccionLogin) seccionLogin.innerHTML = "";

        window.location.hash = "";

    } else {
        mostrarMensaje('Email o contraseña incorrecto, intenta nuevamente');
    }
}

async function  registrarUsuario(e){
    /**
     * 1- Esta función tiene como objetivo controlar que el texto en inputPassword sea exactamente igual al texto ingresado en
     *    inputRepetirPass y luego registrar la cuenta en el REST-API.
     * 2- Para ello en primera instancia deberá cancelar el comportamiento por defecto del envento recibido . Para ello deberá
     *    tomar el parámetro evento ( e ) y ejecutar el método preventDefault().
     * 3- Luego se comparará con una estructura de decisión si los textos ingresados en los controles mencionados son exactamente iguales.
     * 4- En caso afirmativo utilizando usuariosServices mediante el método crear, dará de alta el nuevo usuario.
     * 5- Deberá mostrar una alerta con la leyenda "Email registrado" y cambiará el valor del objeto window.location.href a "#login", para que
     *    se muestre la pantalla de login. 
     * 5- En caso negativo o falso mostrará una alerta indicando que las contraseñas ingresadas no son iguales.  
     */
    e.preventDefault();
 
    if( inputPassword.value === inputRepetirPass.value) {
       await usuariosServices.crear(inputApellido.value, inputNombre.value, inputEmail.value, inputPassword.value, "Cliente");
       mostrarMensaje('Email registrado.') 
       window.location.href = "#login" ; 
    }else{
        mostrarMensaje('Las contraseñas no son iguales');
    }
    
}
async function usuarioExiste() {
    /**
     * 1- El objetivo de esta función es consultar la lista de usuarios con la función usuariosServices.listar() y mediante
     *    un bucle comparar el email y la contraseña ingresado por el usuario en inputEmail e inputPassword con los previamente
     *    almacenados dentro del API-REST sobre el recuros usuarios.
     * 2- Si el email y la contraseña son válidos devuelve el id de usuario.
     * 3- Si el email y la contraseña no son válido devuelve falso.    
     */
    let existeUsuario;
    let idUsuario;
    
    await usuariosServices.login(inputEmail.value, inputPassword.value) 
        .then(respuesta =>{
            if (respuesta.accesoOk == true){
                existeUsuario = true
                let cad=  respuesta.token
                localStorage.setItem('token', cad)
                idUsuario = respuesta.usuario.id
                //usuarioActivo = respuesta.usuario.nombre + ' ' + respuesta.usuario.apellido
                //usuarioFoto = respuesta.usuario.avatar
            }
             
            else{
              existeUsuario = false  
            }   
        })

    if (!existeUsuario) {
       return false;
    } else {
       return idUsuario; 
       
    }
}

export function mostrarUsuario(email) {
    let d = document;
    let btnLogin = d.querySelector(".btnLogin");
    let btnLogout = d.querySelector(".btnRegister");

    if (!email) {
        email = sessionStorage.getItem("email");
    }

    if (email && email !== "") {
        btnLogin.textContent = email;
        btnLogin.removeAttribute("href");

        btnLogout.textContent = "Logout";
        btnLogout.setAttribute("href", "#logout");
        btnLogout.onclick = null; // Limpio cualquier manejador viejo

    } else {
        btnLogin.textContent = "Login";
        btnLogin.setAttribute("href", "#login");

        btnLogout.textContent = "Registrarse";
        btnLogout.setAttribute("href", "#register");

        // Limpiamos el evento onclick por si quedó del logout
        btnLogout.onclick = null;
    }
}


function mostrarMensaje(msj) {
    /**
     * Esta función muestra una alerta con el texto recibido en el parámetro msj.
     */
    alert(msj);
}

export function setUsuarioAutenticado(booleano, idUsuario) {
    /**
     * 1- Esta función deberá registar en el sessionStorage tres valores: autenticado, idUsuario y email.
     * 2- Los valores de los mismos serán tomados de los dos parámetros recibidos y el email será tomado desde la variable
     *    inputEmail.
     */
    let email="";
    if (inputEmail)
       email = inputEmail.value
    sessionStorage.setItem('autenticado', booleano);
    sessionStorage.setItem('idUsuario', idUsuario);
    sessionStorage.setItem('email', email);


}
export function getUsuarioAutenticado() {
    /**
     * 1- Esta función debera leer los valores almacenados en el sessionStorage y construir un objeto con los valores
     * autenticado, idUsuario y email.
     * 2- Luego los devolverá como resultado.
     */
    var session  = new Object();
    session.autenticado = sessionStorage.getItem('autenticado') === "true";
    session.idUsuario = sessionStorage.getItem('idUsuario')
    session.email = sessionStorage.getItem('email');
    return session;
       
}
