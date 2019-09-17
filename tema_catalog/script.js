class Elev {
    constructor(nume){
        this.nume = nume;
        this.note = [];
        this.medii=[];
    }
    medie(){
        if(this.note.length===0){
            return "";
        }else{
            var suma = 0;
            for(var i=0;i<this.note.length;i++){
                suma+=this.note[i];
            }
            this.medii=suma/this.note.length;
            return suma/this.note.length;
            
        }
    }
    addNota(nota){
        this.note.push(nota);
    }
  
}

var listaElevi = [];
var indexElev = -1;
function adaugaElev(event){
    event.preventDefault();
    var nume = document.querySelector("[name='nume']").value;
    if(nume.length>0){
        listaElevi.push(new Elev(nume));
    drawElevi();
    document.querySelector("#elev").reset();
    }
}
function drawElevi(){
    var str="";
    var strHead=`
    <tr><th><input type="button" value="Sorteaza ascendent dupa medie" onclick="sortAscMedie(event);"></th></tr>
			<tr><th><input type="button" value="Sorteaza descendent dupa medie" onclick="sortDescMedie(event);></th></tr><tr>
    <th>Nume</th>
    <th>Medie</th>
    <th></th>
</tr>`;
    for(var i=0;i<listaElevi.length;i++){
        str+=`
            <tr>
                <td>${listaElevi[i].nume}</td>
                <td>${listaElevi[i].medie()}</td>
                <td><input type="button" value="Vezi notele" onclick="editeazaElev(${i});" /></td>
            </tr>
        
        `;
        
    }
    document.querySelector("#tableElevi thead").innerHTML = strHead;
    document.querySelector("#tableElevi tbody").innerHTML = str;
}
function drawNote(){
    var elev = listaElevi[indexElev];
    var note = elev.note;
    var str="";
    for(var i=0;i<note.length;i++){
        str+=`
            <tr>
                <td>${note[i]}<td>
            </tr>
        
        `;
    }
    document.querySelector("#tableNote tbody").innerHTML = str;
}

function editeazaElev(index){

    indexElev=index;
    drawNote();
    document.querySelector("#noteElev").classList.remove("hidden");
    document.querySelector("#noteElev").classList.add("noteElevLeft");
    document.querySelector("#listaElevi").classList.add("listaEleviLeft");
    var obj= listaElevi[indexElev];
    var str="";
    str=obj.nume;
    document.querySelector("#numeElev").innerHTML=`Note elev: `+ str;
}
function adaugaNota(event){
    event.preventDefault();
    var nota = document.querySelector("[name='nota']").value;
    notaNumeric = Number(nota);
    listaElevi[indexElev].addNota(notaNumeric);
    drawElevi();
    drawNote();
    document.querySelector("#nota").reset();
}
function hideNote(){
    document.querySelector("#noteElev").classList.add("hidden");
    document.querySelector("#listaElevi").classList.remove("listaEleviLeft");
    document.querySelector("#noteElev").classList.remove("noteElevLeft");
}
function sortAscNote(event){
    var obj =listaElevi[indexElev]["note"]; 
    var a =obj.sort(function(a, b){return a-b});
    drawNote();
}
function sortDescNote(event){
    var obj =listaElevi[indexElev]["note"]; 
    var a =obj.sort(function(a, b){return b-a});
    drawNote();
}
function sortAscMedie(event){
    listaElevi.sort(function(a, b){return a.medii-b.medii});
    drawElevi();
}
function sortDescMedie(event){
    listaElevi.sort(function(a, b){return b.medii-a.medii});
    drawElevi();
}