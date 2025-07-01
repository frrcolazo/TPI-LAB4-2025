import { usuariosServices } from "../../../servicios/usuarios-servicios.js";
import { mostrarSolo } from "../../utils/utils.js";

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

var formulario;
var inputEmail;
var inputPassword;
var inputRepetirPass;
var inputNombre;
var inputApellido;

export async function login(){
    mostrarSolo("seccionLogin");
    crearFormulario();
    formulario.addEventListener("submit", ingresar);
}  

export async function register(){
    mostrarSolo("seccionLogin");
    crearFormulario(true);
    formulario.addEventListener("submit", registrarUsuario);
}  

function crearFormulario(registrar){
    let d = document;
    let seccionLogin = d.querySelector(".seccionLogin");
<<<<<<< HEAD
=======
    let carrusel = d.querySelector(".carrusel");
    carrusel.innerHTML = '';
    let seccionPaquetes = d.querySelector(".seccionPaquetes"); // <--- corregido
    seccionPaquetes.innerHTML = '';
    let vistaProducto = d.querySelector(".vistaPaquete");
    vistaProducto.innerHTML = '';
    let seccionInicio = d.querySelector(".seccionInicio"); // <-- AGREGADO
    seccionInicio.innerHTML = ''; // <-- AGREGADO
    
>>>>>>> 00142904fbea67cc287c098406e1b8678ca124cf
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
    let existeUsuario;
    let idUsuario;
    await usuariosServices.login(inputEmail.value, inputPassword.value) 
        .then(respuesta =>{
            if (respuesta.accesoOk == true){
                existeUsuario = true
                let cad=  respuesta.token
                localStorage.setItem('token', cad)
                idUsuario = respuesta.usuario.id
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

// Manejo de botones Login/Logout
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
        btnLogout.onclick = null;
    } else {
        mostrarNoAutenticado();
    }
}

export function mostrarNoAutenticado() {
    let d = document;
    let btnLogin = d.querySelector(".btnLogin");
    let btnRegister = d.querySelector(".btnRegister");
    if (btnLogin && btnRegister) {
        btnLogin.textContent = "Login";
        btnLogin.setAttribute("href", "#login");
        btnRegister.textContent = "Registrarse";
        btnRegister.setAttribute("href", "#register");
        btnRegister.onclick = null;
    }
}

function mostrarMensaje(msj) {
    alert(msj);
}

export function setUsuarioAutenticado(booleano, idUsuario) {
    let email="";
    if (inputEmail)
       email = inputEmail.value
    sessionStorage.setItem('autenticado', booleano);
    sessionStorage.setItem('idUsuario', idUsuario);
    sessionStorage.setItem('email', email);
}

export function getUsuarioAutenticado() {
    var session  = new Object();
    session.autenticado = sessionStorage.getItem('autenticado') === "true";
    session.idUsuario = sessionStorage.getItem('idUsuario')
    session.email = sessionStorage.getItem('email');
    return session;
}