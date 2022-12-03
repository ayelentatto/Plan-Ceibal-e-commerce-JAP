const idProduct = localStorage.getItem("prodID"); //declaro constantes
const contenido = document.getElementById("container");
const losComentarios = document.getElementById("comentariosss");


const URLProduct = `https://japceibal.github.io/emercado-api/products/${idProduct}.json`;//urls de productos y comentarios
const urlComments = `https://japceibal.github.io/emercado-api/products_comments/${idProduct}.json`;



const verProducto = (category, name, images, description, currency, cost, soldCount) => {//funcion que muestra producto
  contenido.innerHTML += `
  <div class="descriptionProduct">${description}</div><div class="precioProduct">${currency}${cost} 
  - se vendieron ${soldCount} hasta el momento.</div>`
}
const showCatAndName = (category, name) => {//funcion que muestra categoria y nombre de producto
  document.getElementById("catAndName").innerHTML += `<div id="contieneProduct><div id="categoryProduct" style:"color:red;"> 
  Estas en la categoria: ${category} </div>
  <div class="tituloProduct">${name}</div>`
}
//carrusel img
const carrusel = (images) => {
  let firstImageAct = false;
  for (const image of images) {
    let class_active = "carrousel-item";
    if (firstImageAct == false) {
      class_active = "carrousel-item active";
      firstImageAct = true;
    }
    document.getElementById("imgGrl").innerHTML += `
    <div class="carousel-item ${class_active}">
    <img src="${image}" class="d-block w-100" alt="...">
    </div>
    `
  }
}

const verProdRel = (id, name, image) => {//funcion que muestra productos relacionados
  contenido.innerHTML += `<div  onclick="saveOnLocalS('prodID',${id},'product-info.html')" class="titlePR">${name}
   <div id="imgPR"><img class="fotosPR" src="${image}"/> </div> </div>`
}
const nuevoArray = async () => {//array del producto
  const response = await fetch(URLProduct);
  const jsonProduct = await response.json();
  let newProduct = {
    id: jsonProduct.id,
    name: jsonProduct.name,
    count: 1,
    unitCost: jsonProduct.cost,
    currency: jsonProduct.currency,
    image: jsonProduct.images[0]
  };
  //aca termina el fetch
  setToCart(newProduct)//llamo funcion para guardar datos
  const { category, name, images, description, currency, cost, soldCount } = jsonProduct;//atributos necesarios de jsonProducts
  showCatAndName(category, name)//llamo funcion titulo y categoria
  carrusel(images)//funcion
  verProducto(category, name, images, description, currency, cost, soldCount)
  contenido.innerHTML += `<hr> <div class="productosRelacionados">También te podría interesar:</div>`//cambio contenido PR
  const { relatedProducts } = jsonProduct;//entro para acceder a items de PR
  relatedProducts.forEach((productR) => {//recorro PR
    const { id, name, image
    } = productR//atributos necesarios de items de PR
    verProdRel(id, name, image)//llamo funcion

  })
}//funcion fetch termina acá



function setToCart(newProduct) {
  const agregar = document.getElementById("agreguemos");
  agregar.addEventListener("click", (evt) => {
    noRepeatProduct(newProduct);
    
  })
}



nuevoArray()
//----------------------------------------------------------
//Comentarios.

document.addEventListener("DOMContentLoaded", async () => {
  let response = await fetch(urlComments);
  let jsonComments = await response.json();
  let verComments = jsonComments;

  comentarios(jsonComments)
});

//-----------------------

function comentarios(verComments) {
  for (let i = 0; i < verComments.length; i++) {
    let comentario = verComments[i];
    let Score = parseInt(comentario.score)
    let ScoreComplete = `<span class="fa fa-star checked"></span>`.repeat(Score);
    losComentarios.innerHTML += `<hr><div id="upComment">
        `+ ScoreComplete + `<small id="fechaComment" class="text-muted">${comentario.dateTime}</small></div>
        <div id="user">${comentario.user}: </div><div id="comment">${comentario.description}</div></div><hr>`
  }
}

//agregar comentario
const addComentario = document.getElementById("btn-addComment");
const inputComment = document.getElementById("addComment");

addComentario.addEventListener("click", (evento) => {
  localStorage.setItem("comentario", inputComment.value);
  const radios = document.getElementsByName('estrellas');

  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) {

      break;
    }
  }
  localStorage.setItem("calificacion", radios[i].value);

  let newScore = `<span class="fa fa-star checked"></span>`.repeat(localStorage.getItem("calificacion"));

  losComentarios.innerHTML += `<hr><div id="newComennt">` + newScore + `<div>` + localStorage.getItem("email") + `: 
    <div> `+
    localStorage.getItem("comentario") + `</div></div></div><hr>`
  inputComment.value = "";
  radios[i].checked = false;
})

