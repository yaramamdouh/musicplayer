var add = document.getElementById("add-task");
var newTask = document.getElementById("new-task");
var toDoList = document.getElementById("todo-list");
var doneList = document.getElementById("done-list");
var search = document.getElementById("search");
var userList = document.getElementById("user-list");
var btnaddUser = document.getElementById("add-user");
var userAdded = document.getElementById("user-added")
var currentUser = "no one";

viewAll();
viewUsers();
function viewAll()
{
    toDoList.innerHTML = "";
    doneList.innerHTML = "";
    var myKeys = Object.keys(localStorage);
    if(myKeys.length == 0)
    {
        localStorage.setItem("length","0");
        var arr = [];
        arr = JSON.stringify(arr)
        localStorage.setItem("users",arr);
    }
    for(let i=0;i<myKeys.length;i++)
    {
        if((myKeys[i] != "length")&&(myKeys[i] != "users"))
        {
            addTask(myKeys[i]);
        }
    }
}

btnaddUser.addEventListener("click",function(){
    var userArray = localStorage.getItem("users");
    userArray = JSON.parse(userArray);
    userArray.push(userAdded.value);
    console.log(userArray);
    userArray = JSON.stringify(userArray);
    localStorage.setItem("users",userArray);
    viewUsers();
    userAdded.value = "";
});

add.addEventListener("click",function(){
    var currentObject = {};
    currentObject.task = newTask.value;
    currentObject.completed = false;
    currentObject.user = currentUser;
    var length = localStorage.getItem("length");
    var newIndex = +length + 1;
    str = JSON.stringify(currentObject);
    localStorage.setItem(newIndex.toString(),str);
    localStorage.setItem("length",newIndex.toString());
    addTask(newIndex);
    newTask.value = "";
});

search.addEventListener("input",viewAll);

function addTask(currentTask)
{
    var removeID;
    var doneID;
    var str = localStorage.getItem(currentTask);
    var currentObject = JSON.parse(str);
    var element = document.createElement("li");
    element.textContent = currentObject.task;


    var remove = document.createElement("span");
    remove.textContent = "X";
    remove.classList.add("remove");
    removeID = 100 + +currentTask;
    remove.setAttribute("id",removeID);
    element.appendChild(remove);
    remove.addEventListener("click",function(event){
        var key = event.target.getAttribute("id");
        var removeKey  = +key - 100;
        localStorage.removeItem(removeKey.toString());
        viewAll();
    });

    var done = document.createElement("span");
    done.innerHTML = "&#10003;";
    done.classList.add("done");
    doneID = 200 + +currentTask;
    done.setAttribute("id",doneID);
    element.appendChild(done);
    done.addEventListener("click",function(event){
        var key = event.target.getAttribute("id");
        var doneKey = +key - 200;
        var doneObject = localStorage.getItem(doneKey.toString());
        doneObject = JSON.parse(doneObject);
        doneObject.completed = !(doneObject.completed);
        doneObject = JSON.stringify(doneObject);
        localStorage.setItem(doneKey.toString(),doneObject);
        viewAll();
    });

    var filter = search.value.toUpperCase();
    if(currentObject.task.toUpperCase().indexOf(filter) > -1 )
    {
        if(currentObject.user == currentUser)
        {
            if(currentObject.completed == false)
            {
                toDoList.appendChild(element);
            }
            else
            {
                doneList.appendChild(element);
            }
        }
    }
}

function viewUsers()
{
    userList.innerHTML = "";
    var userArray = localStorage.getItem("users");
    userArray = JSON.parse(userArray);
    for(var x of userArray)
    {
        var user = document.createElement("li");
        user.textContent = x;
        userList.appendChild(user);
        user.addEventListener("click",function(event){
            currentUser = event.target.textContent;
            viewAll();
            userAdded.value = currentUser;
        });
    }

}