

var cards = $('#myCarousel .item').toArray();

startAnim(cards);

function startAnim(array){
        TweenMax.fromTo(array[0], 0.5, {x:0, y: 0, opacity:0.75}, {x:0, y: -120, opacity:0, zIndex: 0, delay:0.03, ease: Cubic.easeInOut, onComplete: sortArray(array)});

        TweenMax.fromTo(array[1], 0.5, {x:79, y: 125, opacity:1, zIndex: 1}, {x: 0, y: 0, opacity:0.75, zIndex: 0, boxShadow: '-5px 8px 8px 0 rgb(182,89,129)', ease: Cubic.easeInOut});

        TweenMax.to(array[2], 0.5, {bezier:[{x:0, y:250}, {x:65, y:200}, {x:79, y:125}], zIndex: 1, opacity: 1, ease: Cubic.easeInOut});

        TweenMax.fromTo(array[3], 0.5, {x:0, y:400, opacity: 0, zIndex: 0}, {x:0, y:250, opacity: 0.75, zIndex: 0, ease: Cubic.easeInOut}, );
    
        
    }

function sortArray(array) {
    clearTimeout(delay);
    var delay = setTimeout(function(){
        var firstElem = array.shift();
        array.push(firstElem);
        return startAnim(array); 
    },2000)
}

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
                <div class="col-lg-3 col-sm-6 col-xs-12 product">
                    <div class="boxBorder">
                        <div id="imgBox">
                            <img class="imgProd" src="${list[i].image}" alt="${list[i].name}">
                        </div>
                        <div>
                            <p id="nameObj">${list[i].name}</p>
                        </div>
                        <div id="bottomBox">
                            <span id="price">${list[i].price}</span> 
                            <span>RON</span>
                            <a href="/Users/Bibisoor/Desktop/scoala informala/teme/proiect final/b/details/details.html?id=${i}">
                                <button id="detailsButton">Detalii</button>
                            </a>
                        </div>
                    </div>
                </div>   
            `;
        document.querySelector("#showProducts").innerHTML = str;
    }
}