myStorage = window.localStorage;
let todoList = [];
let todoObj = [];
let itemCount = 0;




if(myStorage.getItem("todoList")) {
    todoList = JSON.parse(myStorage.getItem("todoList"));
    listOut(todoList);
    listItemDelete(todoList);



    todoObj = JSON.parse(myStorage.getItem("todoObj"));
    listOut2(todoObj);
    listItemDelete2(todoObj);
}
else {
    todoList = [];
    console.log("Empty: " + todoList);
}

//document.querySelector("#out").innerHTML = todoList;




//myStorage.setItem("todoList",JSON.stringify(todoList));
//console.log(JSON.parse(myStorage.getItem("todoList")));
    


   
    



    document.querySelector("#add").onclick = function() {
        
        //dubArr(myarr);
        //console.log(myarr);
        let a = document.querySelector(".addItem").value;
        if(a != "") {
            todoList.push(a);
            listOut(todoList);
            document.querySelector(".addItem").value = "";
            listItemDelete(todoList);
            //console.log(todoList);
            myStorage.setItem("todoList", JSON.stringify(todoList));

            











            let ob = {};
            ob.id = "id" + itemCount;
            ob.text = a;
            ob.dateCreate = new Date;
            ob.status = '';
            todoObj.push(ob);
            itemCount++;
            listOut2(todoObj);
            listItemDelete2(todoObj);
            myStorage.setItem("todoObj", JSON.stringify(todoObj));
        }
        
        
    };

    function dubArr(myarr){
        myarr = myarr.map(item => item*2);
        console.log(myarr);
    }


    function listOut(list) {
        let out = "";
        for (const key in list) {
            out += `<div class="list-item" id="list-item-${key}">${list[key]}</div>`;
        }
        document.querySelector("#out").innerHTML = out;
        

    }

    function listItemDelete(list) {
        let spec = document.querySelectorAll(".list-item");
        spec.forEach(item => {
            item.onclick = function() {
                let index = list.indexOf(item.innerHTML);
                list.splice(index, 1);
                item.remove();
                myStorage.setItem("todoList", JSON.stringify(todoList));
            };
        });
    }
    

////////////////////////////////////////////////////////////////

    function listOut2(list2) {
                //for object
                let out2 = "";
                for (const key in list2) {
                    
                    out2 += `<div id="${list2[key].id}" class="list-item2 ${list2[key].status}">${list2[key].text}</div>`;
                }
                document.querySelector("#out2").innerHTML = out2;
        
        
        
                //
    }


    function listItemDelete2(list) {
        let spec = document.querySelectorAll(".list-item2");
        spec.forEach(function (item) {
                item.onclick = function () {

                    let filter = list.filter(function (it) {
                            return it.id !== item.id;
                        });
                    console.log(filter);
                    console.log(item.id);

                    list = filter;
                    todoObj = filter;

                    //if(item.hasOwnProperty("id"+item.id));
                    console.log(item.id);
                    //list.splice(item.id, 1);
                    item.remove();
                    myStorage.setItem("todoObj", JSON.stringify(list));
                };
            });
    }





// Получение всех пользователей
async function GetUsers() {
    // отправляет запрос и получаем ответ
    const response = await fetch("http://127.0.0.1:7000/api/users", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    // если запрос прошел нормально
    if (response.ok === true) {
        // получаем данные
        const users = await response.json();
        //console.log(users);
        // let rows = document.querySelector("tbody"); 
        // users.forEach(user => {
        //     // добавляем полученные элементы в таблицу
        //     rows.append(row(user));
        // });
    }
}



let requestURL = 'https://jsonplaceholder.typicode.com/users';


function sendRequest(method, url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();

        xhr.open(method, requestURL);
        xhr.responseType = 'json';
        xhr.onload = function () {
            if(xhr.status >= 400) {
                reject('Error ' + xhr.status)
            } else {
                resolve(xhr.response);
            }
            
        };
        //обробка помилки
        xhr.oneerror = function(){
            reject(xhr.response);
        }
        xhr.send();
    });
}




GetUsers();
