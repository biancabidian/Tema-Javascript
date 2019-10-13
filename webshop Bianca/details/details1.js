var products = [];
var i = window.location.search.substring(4);
async function details() {

    var response = await fetch(
        `https://webshop-bianca.firebaseio.com/products/${i}.json`
    );
    window.products = await response.json();
    var str = "";

    str += `
    <div class="column"><img class="imgProd" src="${products.image}" alt="${products.name}"></div>
                
                <div class="column">
                   <p id="addName">${products.name}</p>
                   <p id="">${products.description}</p>
                   <p id="addPrice">Price: ${products.price} RON</p>
                   <hr>
                   <p>Stock: ${products.stock}</p>
                   <label>Quantity: </label><input type="number" id="quantity" value="1" min="1" max="${products.stock}"style="width:50px"/>
                   
                   <div><button onclick="addToCart(event,'${i}');" class="addButton" type="button">ADD TO CART</button></div>
                </div>
                
     
 `;
    document.querySelector("#showList").innerHTML = str;

}
/*
 async function addToCart(event, i) {
     var obj = {
         name: products.name,
         image: products.image,
         price: products.price,
         stock: products.stock,
         quantity: document.querySelector("#quantity").value
     }
     var response = await fetch(
         `https://webshop-bianca.firebaseio.com/cart/${i}.json`, {
             method: "put",
             body: JSON.stringify(obj)
         }
     );
     alert("The product was added to cart.");
     
     var val = document.querySelector("#quantity").value;
    if (cart !== null) {
        if (confirm("The product has been succesfully added to cart.")) {
            if (parseInt(val) + parseInt(cart.quantity) <= products.stock) {
                cart.quantity = parseInt(cart.quantity) + parseInt(document.querySelector("#quantity").value);
                var response = await fetch(`https://webshop-bianca.firebaseio.com/cart/${i}.json`, {
                    method: "put",
                    body: cart.quantity
                });
            }else{
                alert('The selected amount is greater than the available stock.');
            }
        }

*/
async function addToCart(event, i) {

    var response = await fetch(`https://webshop-bianca.firebaseio.com/cart/${i}.json`);
    cart = await response.json();
    var found = false;
    var val = document.querySelector("#quantity").value;
    if (cart !== null) {
        if (confirm("The product has been succesfully added to cart.")) {
            if (parseInt(val) + parseInt(cart.quantity) < products.stock) {
                cart.quantity = parseInt(cart.quantity) + parseInt(document.querySelector("#quantity").value);
                var response = await fetch(`https://webshop-bianca.firebaseio.com/cart/${i}/quantity.json`, {
                    method: "put",
                    body: cart.quantity
                });
            }else if (parseInt(val) + parseInt(cart.quantity) >= products.stock){
                alert('The selected amount is greater than the available stock.');
            }

        }

    }else if (parseInt(val) <= products.stock) {
        var obj = {
            name: products.name,
            image: products.image,
            price: products.price,
            quantity: document.querySelector("#quantity").value

        }
        var response = await fetch(`https://webshop-bianca.firebaseio.com/cart/${i}.json`, {
            method: "put",
            body: JSON.stringify(obj)
        });
        alert("The product was added to the cart.")

    } else if (parseInt(val) + parseInt(cart.quantity) > products.stock){
        alert("The selected amount is greater than the available stock.");
    }
}
/*
async function addToCart(event,i){
    var newProduct = {
    name: null,
    image: null,
    price: 0,
    quantity: 0,
    
        
  };
  newProduct.name = list.name;
  newProduct.image = list.image;
  newProduct.price = list.price;
  newProduct.quantity = parseInt(document.querySelector("[name='quantity']").value);
  
}

async function addToCart(event,i){
let input = document.getElementById('quantity');
    //id
    var id = input.getAttribute('data-product');
    let quantity = Number(input.value);
    let stoc = Number(input.getAttribute('data-stoc'));
    //cartProduct contine produsele
    var cartProducts = new Object();
    //verificam daca exista cart in localStorage
    if(localStorage.getItem(id) === null){
        if(qty <= stoc){
            //append la cartProducts
            cartProducts = {qty: qty};
            //salvam ca string cartProducts
            localStorage.setItem(id, JSON.stringify(cartProducts));
            success.classList.remove('hidden_');
            setTimeout(function(){
                success.classList.add('hidden_');
            }, 2000)
            return;
        } else {
            failure.classList.remove('hidden_');
            setTimeout(function(){
                failure.classList.add('hidden_');
            }, 2000)
            return;
        }
    } else {
        //preluam localstorage ca object pentru ca exista
        cartProducts = localStorage.getItem(id);
        cartProducts = JSON.parse(cartProducts);
        let qtyTemp = cartProducts.qty + qty;
        //verificam daca exista produsul in cos
        if(qtyTemp <= stoc){
                cartProducts.qty = qtyTemp;
                localStorage.setItem(id, JSON.stringify(cartProducts));
                success.classList.remove('hidden_');
                setTimeout(function(){
                    success.classList.add('hidden_');
                }, 2000);
                return;
        } else {
            failure.classList.remove('hidden_');
            setTimeout(function(){
                failure.classList.add('hidden_');
            }, 2000)
            return;
        }
    }
    
}
**/