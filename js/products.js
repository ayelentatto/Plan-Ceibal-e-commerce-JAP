const ORDER_ASC_BY_COST = "Asc";
const ORDER_DESC_BY_COST = "Desc";
const ORDER_BY_PROD_COUNT = "Cant.";

let productsArray = [];
let currentSortCriteria = undefined;
let minPrice = undefined;
let maxPrice = undefined;

const categorias = localStorage.getItem("catID");
const url = PRODUCTS_URL +categorias+EXT_TYPE


function sortCategories(criteria, array){
  let result = [];
  if (criteria === ORDER_ASC_BY_COST)
  {
      result = productsArray.sort(function(a, b) {
          if ( a.cost < b.cost ){ return -1; }
          if ( a.cost > b.cost ){ return 1; }
          return 0;
      });
  }else if (criteria === ORDER_DESC_BY_COST){
      result = productsArray.sort(function(a, b) {
          if ( a.cost > b.cost ){ return -1; }
          if ( a.cost < b.cost ){ return 1; }
          return 0;
      });
  }else if (criteria === ORDER_BY_PROD_COUNT){
      result = productsArray.sort(function(a, b) {
          let aCount = parseInt(a.soldCount);
          let bCount = parseInt(b.soldCount);

          if ( aCount > bCount ){ return -1; }
          if ( aCount < bCount ){ return 1; }
          return 0;
      });
  }
  return result;
}

function LoadDescription(productsArray){
  document.getElementById("lista").innerHTML = ""
  for(const item of productsArray) {
    
    if (((minPrice == undefined) || (minPrice != undefined && parseInt(item.cost) >= minPrice)) &&
    ((maxPrice == undefined) || (maxPrice != undefined && parseInt(item.cost) <= maxPrice))){
  
      document.getElementById("lista").innerHTML += `<div onclick="saveOnLocalS('prodID',${item.id},'product-info.html')" id="contieneTodo">
    <div id="title">
   <h3><br> ${item.name} </br></h3></div>
   <div id="imgen"><img id="fotos" src="${item.image}"/></div><p id="parprod"><h4 id="desc">Descripción:</h4><p id="parprod"> 
   ${ item.description} </p> <p> Hasta el momento se han vendido ${item.soldCount}, ¡No te quedes sin el tuyo! </p><p id="precio"> 
   Solamente cuesta: <h4 id=nameo>US$${item.cost} </h4> </p>`
  
    
  } }}


function sortAndShowProducts(sortCriteria){
  currentSortCriteria = sortCriteria;
/*
  if(productsArray != undefined){
      productsArray = productosArray;
  }
*/
  productsArray = sortCategories(currentSortCriteria, productsArray);

  //Muestro las categorías ordenadas
  LoadDescription(productsArray);
}


document.addEventListener("DOMContentLoaded", async () =>{
  let response = await fetch(url);
  let data = await response.json();
  productsArray = data.products;
  
 LoadDescription(data.products);


 document.getElementById("Asc_Precio").addEventListener("click", function(){
  sortAndShowProducts(ORDER_ASC_BY_COST);
});

document.getElementById("Desc_Precio").addEventListener("click", function(){
  sortAndShowProducts(ORDER_DESC_BY_COST);
});

});
document.getElementById("AscSC").addEventListener("click", function(){
  sortAndShowProducts(ORDER_BY_PROD_COUNT);
});

document.getElementById("limpiarFiltroRango").addEventListener("click", function(){
  document.getElementById("filtrarPorMinPrice").value = "";
  document.getElementById("filtrarPorMaxPrice").value = "";

  minPrice = undefined;
  maxPrice = undefined;

  LoadDescription(productsArray);
});

document.getElementById("filterForSC").addEventListener("click", function(){
  //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
  //de productos por categoría.
  minPrice = document.getElementById("filtrarPorMinPrice").value;
  maxPrice = document.getElementById("filtrarPorMaxPrice").value;

  if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0){
      minPrice = parseInt(minPrice);
      
  }
  else{
      minPrice = undefined;
  }

  if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0){
      maxPrice = parseInt(maxPrice);

  

  }
  else{
      maxPrice = undefined;
  }

  LoadDescription(productsArray);
});


/*
async function productsArray() {
    let response = await fetch(url);
    let data = await response.json();
    console.log(data.products);
   LoadDescription(data.products);
 }

*/

