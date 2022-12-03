//392064367090-019un27o8fn206q1ps5d81sbn6plj9cm.apps.googleusercontent.com id cliente
//secreto cliente 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



const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
const boton = document.getElementById("btni")

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();

      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}


// Escribe el código a continuación


let infoEmail = localStorage.getItem("email");
console.log(infoEmail);

let menuPrinc = document.getElementById("navbarNav");
let itemsPrinc = document.getElementsByTagName("li")
let ultimoLi = itemsPrinc[itemsPrinc.length - 1]
ultimoLi.innerHTML += `
<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
  `+ localStorage.getItem("email") + `
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
    <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
    <li ><a onclick="cerrarSesion()" class="dropdown-item" href="login.html">Cerrar sesion</a></li>
  </ul>
</div>
`
function cerrarSesion() {
  localStorage.removeItem("email")
}
//document.getElementById("usuario").innerHTML = `<a class="nav-link">`+ localStorage.getItem("email") +`</a>`
//la linea de arriba fue cambiada ya que el id usuario solo existía en pagina inicio,solucion:  seleccionando todos los "li" y luego el ultimo para modificarlo

//para el carrito
let arrayCart = JSON.parse(localStorage.getItem("cart"));
if (!arrayCart) {
  arrayCart = [];
  localStorage.setItem("cart", JSON.stringify(arrayCart));
}
/*
const removeToCart(product)=>{
  let arrayCart = JSON.parse(localStorage.getItem("cart"));
  arrayCart.removeItem
}*/



const noRepeatProduct = (product) => {
  if (localStorage.getItem("cart").includes(product.id) === false) {
    let arrayCart = JSON.parse(localStorage.getItem("cart"));
    arrayCart.push(product);
    let myarrayCart = JSON.stringify(arrayCart);
    localStorage.setItem("cart", myarrayCart);
    arrayCart = JSON.parse(localStorage.getItem("cart"));

    document.querySelector('.alCarrito').classList.remove("d-none");
    document.querySelector('.alCarrito').classList.add("d-block");

  } else {
    ;
  }
}

//


//validacion forms
///// funcion de botstrap apra desvalidar por defecto

(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  let forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
          document.querySelector('.showErr').classList.remove("d-none");
          document.querySelector('.showErr').style.color = 'red'
          document.querySelector('.showErr').classList.add("d-block");

        } else {
          document.querySelector('.showIfValid').classList.remove("d-none");
          document.querySelector('.showIfValid').classList.add("d-block");
          form.classList.add('was-validated');

        }

        form.classList.add('was-validated')
      }, false)
    })
})()


//toasts bootstrap
/*
$(document).ready(function(){
  $('.toast').toast('show');
  
});*/

//funcion guardar datos en localstorage
function saveOnLocalS(key, dato, pagina) {
  localStorage.setItem(key, dato);
  window.location = pagina;

}