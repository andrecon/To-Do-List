var currentTime = new Date().getHours();
if (currentTime >= 6 && currentTime < 10) {
    document.getElementById("Image").style.backgroundImage="url('img/1.jpg')";
}
else if(currentTime >= 10 && currentTime < 14) 
{
    document.getElementById("Image").style.backgroundImage="url('img/2.jpg')";
}
else if(currentTime >= 14 && currentTime < 18) 
{
    document.getElementById("Image").style.backgroundImage="url('img/3.jpg')";
}
else if(currentTime >= 18 && currentTime < 22) 
{
    document.getElementById("Image").style.backgroundImage="url('img/4.jpg')";
}
else if(currentTime >= 22 || currentTime < 9) 
{
    document.getElementById("Image").style.backgroundImage="url('img/5.jpg')";
}


//Getting element names
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//Getting class name
const checkTask = "fa-check-circle";
const unCheckTask = "fa-circle-thin";
const lineThrough = "lineThrough";

let listVec, id;

/* List Structured:
   {
        name: TaskName,
        id: idNumber,
        done: false/true,
        trash: false/true
    }
*/

//TODO is our key
let data = localStorage.getItem("TODO");

if(data){
    listVec = JSON.parse(data);
    id = listVec.length;
    loadList(listVec);
}
else
{
    listVec = [];
    id = 0;
}

function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}


//Clear Local Storage
clear.addEventListener('click', function(){
    localStorage.clear();
    location.reload(); //reload page
});

//Update Date
let options = {weekday:'long', month:'short', day:'numeric'};
let today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

function addToDo(toDo, id, done, trash ){

    if(trash){  //Trash set to true, we finished tasked
        return;
    }

    const DONE = done ? checkTask : unCheckTask;
    const LINE = done ? lineThrough : "";


	const text = `<li class="item">
		<i class="co fa ${DONE} " job="complete" id="${id}" ></i>
		<p class="text ${LINE} "> ${toDo} </p>
		<i class="de fa fa-trash-o" job="delete" id="${id}"></i>
		</li>`

	const position ="beforeend";
	list.insertAdjacentHTML(position, text);
}

document.addEventListener("keyup", function(event){
	if(event.keyCode == 13){
		const toDo = input.value;
		if(toDo) {                              //If string is not empty, this will add a todo in our page
			addToDo(toDo, id, false, false);
			listVec.push(
				{
					name: toDo,
					id: id,
					done: false,
					trash: false
				}
			);        
            input.value = " ";
            id++;
		}
    }
    //Update Local Storage
    localStorage.setItem("TODO", JSON.stringify(listVec));
});

function completeToDo(element){
    element.classList.toggle(checkTask);
    element.classList.toggle(unCheckTask);

    element.parentNode.querySelector(".text").classList.toggle(lineThrough);
    listVec[element.id].done = listVec[element.id].done ? false : true;
}

function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    listVec[element.id].trash = true;
    
    //Update Local Storage
    localStorage.setItem("TODO", JSON.stringify(listVec));
}

list.addEventListener("click", function(event){
    const element = event.target; //<i class="de fa fa-trash-o" job="delete" id="${id}"></i>
    const elementJob = element.attributes.job.value; //delete or complete
    if(elementJob == "complete"){
        completeToDo(element);
    }
    else if(elementJob == "delete"){
        removeToDo(element);
    }

    //Update Local Storage
    localStorage.setItem("TODO", JSON.stringify(listVec));
})


