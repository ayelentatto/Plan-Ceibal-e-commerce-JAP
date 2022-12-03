const pwd = document.getElementById("pwd");
const email = document.getElementById("correo");
const boton = document.getElementById("btni");
function validacion() {
   if ((pwd.value.length > 6) && (email.value.includes("@"))) {
      showAlertSuccess();
      
     localStorage.setItem("email", email.value);
      window.location.href = "index.html";
      return true;
   } else {
      showAlertError()
      return false;
   }
}
function showAlertSuccess() {
   alert("Inicio de sesion completo!")
}
function showAlertError() {
   alert("Usuario o contraseña incorrectos")
}
boton.addEventListener("click", (evt) => {
   validacion();
 
});
console.log(localStorage.getItem("email"));

