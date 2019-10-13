var list = [];

async function draw() {
  var response = await fetch(
    "https://webshop-bianca.firebaseio.com/products.json"
  );
  window.list = await response.json();

  var str = "";
  for (var i in list) {
    if (list[i] === null) {
      continue;
    }
    str += `
        <tbody>
        <tr>
        <td>${list[i].name}</td>
        <td>${list[i].stock}</td>
        <td>${list[i].price}</td>
        <td><a href="edit.html?id=${i}"><button class="editButton">EDIT</button></a><button onclick="del(event,'${i}');" class="deleteButton">DELETE</<button></td>
        </tr>
        </tbody>
        `;
  }
  document.querySelector("#showProducts").innerHTML = str;
}

async function addProduct(event) {
  event.preventDefault();

  var obj = {
    name: document.querySelector("[name='name']").value,
    image: document.querySelector("[name='image']").value,
    stock: document.querySelector("[name='stock']").value,
    price: document.querySelector("[name='price']").value,
    description: document.querySelector("[name='description']").value
  };

  var response = await fetch(
    "https://webshop-bianca.firebaseio.com/products.json", {
      method: "post",
      body: JSON.stringify(obj)
    }
  );

  draw();
  document.querySelector("#addForm").reset();
}

async function del(event, i) {
  event.preventDefault();
  if (confirm("Are you sure you want to delete this product?")) {
    var response = await fetch(
      `https://webshop-bianca.firebaseio.com/products/${i}.json`, {

        method: "delete"
      }
    )
    draw();
  };
}