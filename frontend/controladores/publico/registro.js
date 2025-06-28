import { usuariosServices } from "/servicios/usuarios-servicios.js";

export function Registro() {
  const d = document;

  const htmlRegistro = `
  <div class="register-box">
    <div class="card card-outline card-dark">
      <div class="card-body register-card-body">
        <p class="login-box-msg">Crear una cuenta</p>
        <form class="frmRegistro">
          <div class="form-group">
            <label>Nombre</label>
            <input type="text" class="form-control" id="regNombre" required>
          </div>
          <div class="form-group">
            <label>Apellido</label>
            <input type="text" class="form-control" id="regApellido" required>
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control" id="regEmail" required>
          </div>
          <div class="form-group">
            <label>Contraseña</label>
            <input type="password" class="form-control" id="regPassword" required>
          </div>
          <button type="submit" class="btn bg-dark btn-block">Registrarme</button>
          <div class="text-center mt-2">
            <a href="/">Ya tengo cuenta</a>
          </div>
        </form>
      </div>
    </div>
  </div>`;

  console.log('Registro function called');
  const cP = d.getElementById("contenidoPrincipal");
  const sitio = d.getElementById("sitio");
  const loginForm = d.getElementById("frmLogin");
  
  // If site is hidden (user not authenticated), replace login form
  if (sitio && sitio.classList.contains('d-none') && loginForm) {
    console.log('Replacing login form with register form');
    loginForm.innerHTML = htmlRegistro;
  } else if (cP) {
    console.log('Loading register form in main content');
    cP.innerHTML = htmlRegistro;
  } else {
    console.log('No target found for register form');
  }

  d.querySelector(".frmRegistro").addEventListener("submit", async function (e) {
    e.preventDefault();
    const nombre = document.getElementById("regNombre").value;
    const apellido = document.getElementById("regApellido").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;

    try {
      await usuariosServices.crear(apellido, nombre, email, password, "Cliente");
      alert("Registro exitoso. Ahora podés iniciar sesión.");
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("Error al registrarte.");
    }
  });
}
