import { usuariosServices } from "/servicios/usuarios-servicios.js";

const htmlAmUsuarios = `
<div class="card card-dark card-outline">
  <form class="needs-validation frmAmUsuario">
    <div class="card-header">
      <div class="col-md-8 offset-md-2">
        <div class="form-group mt-5">
          <label>Nombre</label>
          <input type="text" class="form-control" name="nombre" id="usuarioNombre" required>
        </div>
        <div class="form-group mt-2">
          <label>Apellido</label>
          <input type="text" class="form-control" name="apellido" id="usuarioApellido" required>
        </div>
        <div class="form-group mt-2">
          <label>Email</label>
          <input type="email" class="form-control" name="email" id="usuarioEmail" required>
        </div>
        <div class="form-group mt-2">
          <label>Password</label>
          <input type="password" class="form-control" name="password" id="usuarioPassword" required placeholder="Ingrese nueva contraseña">
        </div>
        <div class="form-group mt-2">
          <label>Rol</label>
          <select class="form-control" name="role" id="usuarioRole" required>
            <option value="Cliente">Cliente</option>
            <option value="Administrador">Administrador</option>
          </select>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <div class="col-md-8 offset-md-2">
        <div class="form-group mt-3">
          <a href="#/usuarios" class="btn btn-light border text-left">Cancelar</a>
          <button type="submit" class="btn bg-dark float-right">Guardar</button>
        </div>
      </div>
    </div>
  </form>
</div>`;

let formulario, txtNombre, txtApellido, txtCorreo, txtPass, selRole, idUsuario;

export async function newRegister(){
    let d = document;
    d.querySelector('.contenidoTitulo').innerHTML = 'Agregar Usuario';
    d.querySelector('.contenidoTituloSec').innerHTML = 'Agregar';
    crearFormulario();
    formulario = d.querySelector(".frmAmUsuario");
    formulario.addEventListener("submit", guardar);
}

export async function editRegister(id){
    let d = document;
    idUsuario = id;
    d.querySelector('.contenidoTitulo').innerHTML = 'Editar Usuario';
    d.querySelector('.contenidoTituloSec').innerHTML = 'Editar';
    crearFormulario();
    formulario = d.querySelector(".frmAmUsuario");
    formulario.addEventListener("submit", modificar);

    let usuario = await usuariosServices.listar(id);
    txtNombre.value = usuario.nombre;
    txtApellido.value = usuario.apellido;
    txtCorreo.value = usuario.correo;
    txtPass.value = '';
    selRole.value = usuario.role;
}

function crearFormulario(){
    let d = document;
    d.querySelector('.rutaMenu').innerHTML = "Usuarios";
    d.querySelector('.rutaMenu').setAttribute('href',"#/usuarios");
    d.getElementById('contenidoPrincipal').innerHTML = htmlAmUsuarios;
    txtNombre = d.getElementById('usuarioNombre');
    txtApellido = d.getElementById('usuarioApellido');
    txtCorreo = d.getElementById('usuarioEmail');
    txtPass = d.getElementById('usuarioPassword');
    selRole = d.getElementById('usuarioRole');
}

function guardar(e) {
    e.preventDefault();
    
    // Client-side password validation
    if (txtPass.value.length < 8) {
        alert('La contraseña debe tener al menos 8 caracteres');
        return;
    }
    if (!/[A-Z]/.test(txtPass.value)) {
        alert('La contraseña debe contener al menos una letra mayúscula');
        return;
    }
    
    usuariosServices.crear(
        txtApellido.value,
        txtNombre.value,
        txtCorreo.value,
        txtPass.value,
        selRole.value
    )
    .then(response => {
        if (response.message) {
            formulario.reset();
            window.location.href = "#/usuarios";
        } else if (response.detail) {
            alert('Error: ' + response.detail);
        }
    })
    .catch(error => {
        console.log(error);
        alert('Error al crear usuario. Verifique los datos ingresados.');
    });
}

function modificar(e) {
    e.preventDefault();
    
    // Client-side password validation (only if password is provided)
    if (txtPass.value && txtPass.value.length > 0) {
        if (txtPass.value.length < 8) {
            alert('La contraseña debe tener al menos 8 caracteres');
            return;
        }
        if (!/[A-Z]/.test(txtPass.value)) {
            alert('La contraseña debe contener al menos una letra mayúscula');
            return;
        }
    }
    
    usuariosServices.editar(
        idUsuario,
        txtApellido.value,
        txtNombre.value,
        txtCorreo.value,
        txtPass.value,
        selRole.value
    )
    .then(response => {
        if (response.message) {
            formulario.reset();
            window.location.href = "#/usuarios";
        } else if (response.detail) {
            alert('Error: ' + response.detail);
        }
    })
    .catch(error => {
        console.log(error);
        alert('Error al modificar usuario. Verifique los datos ingresados.');
    });
}
