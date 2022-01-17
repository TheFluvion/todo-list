//getting all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteALLBtn = document.querySelector(".footer button");

inputBox.onkeyup = () =>{
    let userData = inputBox.value; //getting user entered value
    if(userData.trim() != 0){ //if user values arent only spaces
        addBtn.classList.add("active"); //active the add button
    }else{
        addBtn.classList.remove("active"); //unactive the add button
    }
}

showTasks(); //calling showTasks function

//if user click on the add button
addBtn.onclick = () => {
    let userData = inputBox.value; //getting user entered value
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
    if(getLocalStorage == null){ //if localStorage is null
        listArr = []; //creating blank array
    }else{
        listArr = JSON.parse(getLocalStorage); //transforming json string into a js object
    }
    listArr.push(userData);//pushing or adding user data
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string
    showTasks(); //calling showTasks function
    addBtn.classList.remove("active"); //unactive the add button
}

//function to add task list inside ul
function showTasks(){
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
    if(getLocalStorage == null){ //if localStorage is null
        listArr = []; //creating blank array
    }else{
        listArr = JSON.parse(getLocalStorage); //transforming json string into a js object
    }
    const number = document.querySelector(".number");
    number.textContent = listArr.length; //passing the length value in the number
    if(listArr.length > 0){ // if array length is greater than 0
        deleteALLBtn.classList.add("active"); //active the clearall button
    }else{
        deleteALLBtn.classList.remove("active");//unactive the clearall button
    }
    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += `<li> ${element}<span onclick="deleteTask(${index})"; ><i class="bi bi-trash-fill"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
    inputBox.value = ""; //once task added leave the input field blank
}

//delete task function
function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage); 
    listArr.splice(index, 1); //delete or remove the particular li
    // after remove the li again update the local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string
    showTasks(); //calling showTasks function
}

//delete all tasks function
deleteALLBtn.onclick = () =>{
    listArr = []; //empy an array
    // after delete all task again update the local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string
    showTasks(); //calling showTasks function
}