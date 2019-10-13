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
