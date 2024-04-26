    const removeProductButtons = document.getElementsByClassName("remove-product-button")
    for (var i = 0; i<removeProductButtons.length; i++){
        removeProductButtons[i].addEventListener("click", removeProduct)
    }
    const quantityInputs = document.getElementsByClassName("product-qtd-input")
    for(var i = 0; i<quantityInputs.length;i++){
    quantityInputs[i].addEventListener("change", checkIfInputIsNull)
    }

    const addToCartButtons= document.getElementsByClassName("button-hover-background")
    for(var i = 0; i<addToCartButtons.length;i++){
        addToCartButtons[i].addEventListener("click", addProductToCart)
        }

function checkIfInputIsNull(event){
    if(event.target.value == "0"){
        event.target.parentElement.parentElement.remove()
    }
    updateTotal()
}


function removeProduct(event){
    event.target.parentElement.parentElement.remove()
    updateTotal()
}

function updateTotal(){

let valorTotal = 0
const cartProducts = document.getElementsByClassName("cart-product")
for(var i = 0; i< cartProducts.length;i++){
    const productPrice = cartProducts[i].getElementsByClassName("cart-product-price")[0].innerText.replace("R$", "").replace(",",".")
    const productQuantity = cartProducts[i].getElementsByClassName("product-qtd-input")[0].value
    
    valorTotal += productPrice*productQuantity
}
valorTotal = valorTotal.toFixed(2)
document.querySelector(".cart-total-container span").innerText = "R$" + valorTotal
}

function addProductToCart(event){
    const button = event.target
    const productInfos = button.parentElement.parentElement
    const productImage = productInfos.getElementsByClassName("product-image")[0].src
    const productTitle = productInfos.getElementsByClassName("card-title")[0].innerText
    const productPrice = productInfos.getElementsByClassName("product-price")[0].innerText

    const productsCartName = document.getElementsByClassName("cart-product-title")
    for(var i = 0; i<productsCartName.length;i++){
        if(productsCartName[i].innerText == productTitle){
            productsCartName[i].parentElement.parentElement.getElementsByClassName("product-qtd-input")[0].value++
            return
            }
        }


   let newCartProduct = document.createElement("tr")
   newCartProduct.classList.add("cart-product")
   console.log(newCartProduct)

   newCartProduct.innerHTML = 
   `
   <td class="product-identification">
   <img class="cart-product-image" src="${productImage}">
   <strong class="cart-product-title">${productTitle}</strong>
</td>
<td>
   <span class="cart-product-price">${productPrice}</span>
</td>
<td>
   <input class="product-qtd-input" type="number" value="1" min="0">
   <button class="remove-product-button btn btn-lg btn-danger" type="button">Remover</button>
</td>
`

const tableBody = document.querySelector(".cart-table tbody")
tableBody.append(newCartProduct)
alert("Produto Adicionado")

newCartProduct.getElementsByClassName("product-qtd-input")[0].addEventListener("change", checkIfInputIsNull)
newCartProduct.getElementsByClassName("remove-product-button")[0].addEventListener("click", removeProduct)

updateTotal()
}