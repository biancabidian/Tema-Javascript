async function draw() {
    var transport = 0;
    var total = 0;
    var totalProducts = 0;
    var response = await fetch(`https://webshop-bianca.firebaseio.com/cart.json`);
    window.list = await response.json();
    var str = "";
    for (var i in list) {
        if (list[i] === null) continue;
        subtotal = list[i].quantity * list[i].price ;
        total = total + subtotal;
        totalProducts = totalProducts + list[i].quantity ;
        transport = transport + list[i].quantity;
        str += ` 
                    <tr>
                   
                        <th scope="row" name="name"> <a href="/Users/Bibisoor/Desktop/scoala informala/teme/proiect final/b/details/details.html?id=${i}">${list[i].name} </a></th>
                        <td name="image"><img style="width:100px; height=100px;" src="${list[i].image}" alt='' /></td>
                        <td name="price">${list[i].price}</td>
                        <td name="quantity">
                            <input type="button" value="-" class="minus" onclick="decrease(event,'${i}')">
                            <input type="number"  value="${list[i].quantity}" min="1" max="${list[i].stock}" class="numValue"> 
                            <input type="button" value="+"  class="plus" onclick="increase(event,'${i}')"> 
                       </td>
                        <td name="subTotal">${list[i].quantity * list[i].price}</td>
                        <td><input type="button" value="DELETE" class="deleteButton" onclick="del(event,'${i}')"></td>
                    </tr>
    `
    }
    document.querySelector("#showProducts table tbody").innerHTML = str;

    document.querySelector("#products").innerHTML = totalProducts;;
    document.querySelector("#totalPrice").innerHTML = total;
    document.querySelector("#vat").innerHTML = 19 / 100 * total;
    document.querySelector("#transport").innerHTML = transport * 5/100;

}
async function decrease(event, i) {
    if (list[i].quantity > 1) {
        var response = await fetch(`https://webshop-bianca.firebaseio.com/cart/${i}/quantity.json`, {
            method: "put",
            body: parseInt(list[i].quantity) - 1
        });
    } else if (list[i].quantity < 1){
        alert("Order at least 1 product.");
    }
    draw();
}
async function increase(event, i) {
    if (list[i].quantity < list[i].stock) {
        var response = await fetch(`https://webshop-bianca.firebaseio.com/cart/${i}/quantity.json`, {
            method: "put",
            body: parseInt(list[i].quantity) + 1
        });
    } else if (list[i].quantity > list[i].stock){
        alert("Maximum stock available");
    }
    draw();
}
async function del(event, i) {
    var response = await fetch(`https://webshop-bianca.firebaseio.com/cart/${i}.json`, {
        method: "delete",
    });
    alert("Are you sure you want to remove this product from your cart?");
    draw();
}