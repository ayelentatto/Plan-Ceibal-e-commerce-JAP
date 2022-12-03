const userID = "25801";
const urlCart = CART_INFO_URL + `${userID}` + EXT_TYPE;

//fetch carrito user
const fetchCart = async () => {
    const response = await fetch(urlCart);
    const jsonCart = await response.json();
    const { articles } = jsonCart;
    let arrayCart = JSON.parse(localStorage.getItem("cart"))

    articles.forEach((articulo) => {
        const { count, currency, id, image, name, unitCost } = articulo;

        let otherProduct = {
            id: id,
            name: name,
            count: count,
            unitCost: unitCost,
            currency: currency,
            image: image
        };

        noRepeatProduct(otherProduct);
        showProductsCart(arrayCart);
    });
};

//termina el fetch

function removeProduct(id) {
    let arrayCart = JSON.parse(localStorage.getItem("cart"))
    arrayCart = arrayCart.filter(item => item.id != id
    )
    localStorage.setItem('cart', JSON.stringify(arrayCart));
    document.getElementById("addHereArtCart").innerHTML = "";

    fetchCart();
}





//completar tabla
const showProductsCart = (arrayCart) => {
    for (const product of arrayCart) {
        document.getElementById("addHereArtCart").innerHTML += `<tr>
    <td><img width="20%" src="${product.image}"/> </td>
    <td> ${product.name} </td> <td id="priceArt">${product.unitCost} ${product.currency} </td>
    <td><input type="number" value="1" id="CantArt${product.id}"class="cantidad" min="1" required></td>
    <td class="subtotales" id="resultST${product.id}"><span class="valueCash">${product.unitCost}${product.currency}</span></td>
    <td class="remover${product.id} eliminar" onclick="removeProduct(${product.id})"> <i class="fa-regular fa-trash-can"></i></td>
    </tr>`

    }
    subtotalTable1(arrayCart)
}
const subtotalTable1 = (arrayCart) => {
    for (const product of arrayCart) {
        const cantidadInput = document.querySelector('#CantArt' + product.id);
        const resultST1 = document.getElementById("resultST" + product.id);

        if (product.currency === 'UYU') {//paso los pesos a dolares
            let cantPorCost = (cantidadInput.value * product.unitCost);
            const priceUSD = cantPorCost / 40;
            resultST1.innerHTML = `<span class="valueCash">${priceUSD}USD</span>`;//reestablezco la columna subtotales cuando carga la pagina
            const itemsSpan = document.querySelectorAll("span.valueCash");
            //
            calcularSubtotales(itemsSpan)
            cantidadInput.addEventListener('input', () => {//reestablezco la columna subtotales cuando se modifica la cantidad 
                let cantPorCost = (cantidadInput.value * product.unitCost);
                const priceUSD = parseInt(cantPorCost / 40);
                resultST1.innerHTML = `<span class="valueCash">${priceUSD}USD</span>`;
                calcularSubtotales(itemsSpan)

            });
        }
    }
}

const costoEnvioSelect = document.getElementById("CostEnvCheck");
const envios = document.querySelectorAll('.envio');
const showSubt = document.getElementById("subTSuma");
function calcularSubtotales(itemsSpan) {
    let totall = 0;

    for (let i = 0; i < itemsSpan.length; i++) {
        const valueArt = parseInt(document.querySelectorAll("span.valueCash")[i].innerHTML);
        totall += parseInt(valueArt);
        showSubt.innerHTML = totall + 'USD';
        calcularEnvio(envios, totall);
        const costoEnvio = parseInt(document.getElementById("CostEnvCheck").innerHTML)

        document.getElementById('totalDeTotales').innerHTML = sumar(totall, costoEnvio) + `USD`;

    }
}


function porcent(num1, num2) {
    let resultTotal = ((num1 * num2) / 100);
    return resultTotal;

}
function sumar(a, b) {
    let r = (a + b);
    return r;
}
function calcularEnvio(elemento, num) {
    if (elemento[0].checked) {
        costoEnvioSelect.innerHTML = porcent(num, 15) + `USD`;
    } else if (elemento[1].checked) {
        costoEnvioSelect.innerHTML = porcent(num, 7) + `USD`;
    } else if (elemento[2].checked) {
        costoEnvioSelect.innerHTML = porcent(num, 5) + `USD`;
    }
}


//tipo pago card o bank
const pagos = document.querySelectorAll('.pago'); //clase de opciones card o bank
const inputNumber = document.getElementById("numberCard");// tarjeta
const inputCode = document.getElementById("codCard");// tarjeta
const inputVenc = document.getElementById("vencCard");// tarjeta
const numCuenta = document.getElementById("countBank");//bank
const showCostSend = document.getElementById("CostEnvCheck");
const btnAceptPago = document.getElementById('btnAceptar');
let mensajeModal = document.getElementById("pagar");
function selectPago() {
    if (pagos[0].checked) {
        selectCreditCard();
    } else {
        selectBank();
    }
}

const selectBank = () => { //si se elige cuenta bancaria
    //   pagos[0].checked = false;
    inputNumber.disabled = true;
    inputCode.disabled = true;
    inputVenc.disabled = true;
    numCuenta.disabled = false;
    mensajeModal.innerText = 'Transferencia bancaria'
    mensajeModal.classList.remove("d-none");
    mensajeModal.classList.add("d-inline-Block")
    mensajeModal.style.color = 'white'
    validarNumBank()
}

function validarNumBank() {
    if (numCuenta.value.length < 13 || numCuenta.value.length > 18) {
        mensajeModal.style.color = 'red'
        mensajeModal.innerText = 'TRANSFERENCIA BANCARIA - verificación NO aprobada'

    } else {
        mensajeModal.style.color = 'green'
        mensajeModal.innerText = 'TRANSFERENCIA BANCARIA - verificación aprobada'
    }
}
document.getElementById("countBank").addEventListener("input", () => {
    validarNumBank()
})

function validarCreditCard() {
    if (inputCode.value.length < 13 || inputCode.value.length > 16 || inputCode.value.length < 2 || inputCode.value.length > 4 || inputVenc.value.length > 5) {
        mensajeModal.style.color = 'red'
        mensajeModal.innerText = 'TARJETA DE CREDITO - verificación NO aprobada'

    } else {
        mensajeModal.style.color = 'green'
        mensajeModal.innerText = 'TARJETA DE CREDITO - verificación aprobada'
    }
}
let inputsCard = document.querySelectorAll('input.cardOption');
for (let inputt of inputsCard) {
    inputt.addEventListener("input", () => {
        validarCreditCard();
    })
}




const selectCreditCard = () => { //si se elige tarjetad e credito
    // pagos[1].checked = false;
    numCuenta.disabled = true;
    inputNumber.disabled = false;
    inputCode.disabled = false;
    inputVenc.disabled = false;
    mensajeModal.innerText = 'Tarjeta de credito'
    mensajeModal.classList.remove("d-none");
    mensajeModal.classList.add("d-inline-Block")
    validarCreditCard()

}

//verificacion

const btnPago = document.getElementById("btnPago");

document.addEventListener('DOMContentLoaded', async () => {
    fetchCart();
});