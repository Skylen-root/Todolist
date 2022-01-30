const express = require("express");
const fs = require("fs");
const sqlite3 = require('sqlite3').verbose();





const cors = require('cors');
const app = express();
app.use(cors());
app.options('*', cors());
app.use(express.urlencoded());





//const app = express();
const jsonParser = express.json();

const port = 7000;
  
app.use(express.static(__dirname + "/public"));
  
const filePath = "users.json";
app.get("/api/users", function(req, res){
    //res.setHeader('Access-Control-Allow-Origin', '*');
    //res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');

    const content = fs.readFileSync(filePath,"utf8");
    const users = JSON.parse(content);
    res.send(users);
    
});
// получение одного пользователя по id
app.get("/api/users/:id", function(req, res){
       
    const id = req.params.id; // получаем id
    const content = fs.readFileSync(filePath, "utf8");
    const users = JSON.parse(content);
    let user = null;
    // находим в массиве пользователя по id
    for(var i=0; i<users.length; i++){
        if(users[i].id==id){
            user = users[i];
            break;
        }
    }
    // отправляем пользователя
    if(user){
        res.send(user);
    }
    else{
        res.status(404).send();
    }
});
// получение отправленных данных
app.post("/api/users", jsonParser, function (req, res) {
      
    if(!req.body) return res.sendStatus(400);
      
    const userName = req.body.name;
    const userAge = req.body.age;
    let user = {name: userName, age: userAge};
      
    let data = fs.readFileSync(filePath, "utf8");
    let users = JSON.parse(data);
      
    // находим максимальный id
    const id = Math.max.apply(Math,users.map(function(o){return o.id;}))
    // увеличиваем его на единицу
    user.id = id+1;
    // добавляем пользователя в массив
    users.push(user);
    data = JSON.stringify(users);
    // перезаписываем файл с новыми данными
    fs.writeFileSync("users.json", data);
    res.send(user);
});
 // удаление пользователя по id
app.delete("/api/users/:id", function(req, res){
       
    const id = req.params.id;
    let data = fs.readFileSync(filePath, "utf8");
    let users = JSON.parse(data);
    let index = -1;
    // находим индекс пользователя в массиве
    for(var i=0; i < users.length; i++){
        if(users[i].id==id){
            index=i;
            break;
        }
    }
    if(index > -1){
        // удаляем пользователя из массива по индексу
        const user = users.splice(index, 1)[0];
        data = JSON.stringify(users);
        fs.writeFileSync("users.json", data);
        // отправляем удаленного пользователя
        res.send(user);
    }
    else{
        res.status(404).send();
    }
});
// изменение пользователя
app.put("/api/users", jsonParser, function(req, res){
       
    if(!req.body) return res.sendStatus(400);
      
    const userId = req.body.id;
    const userName = req.body.name;
    const userAge = req.body.age;
      
    let data = fs.readFileSync(filePath, "utf8");
    const users = JSON.parse(data);
    let user;
    for(var i=0; i<users.length; i++){
        if(users[i].id==userId){
            user = users[i];
            break;
        }
    }
    // изменяем данные у пользователя
    if(user){
        user.age = userAge;
        user.name = userName;
        data = JSON.stringify(users);
        fs.writeFileSync("users.json", data);
        res.send(user);
    }
    else{
        res.status(404).send(user);
    }
});

//my text --BEGIN
let db = new sqlite3.Database('base.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the chinook database.');
  });

app.post("/api/adduser/:id", jsonParser, function (req, res) {

    const id = req.params.id;

    db.serialize(() => {
        db.each('SELECT * FROM users', (err, row) => {
          if (err) {
            console.error(err.message);
          }
          console.log(row.first_name +"\t" + row.phone);
        });
      });
    





      
    if(!req.body) return res.sendStatus(400);
      
    const userName = req.body.name;
    const userAge = req.body.age;
    let user = {name: userName, age: userAge};
      
    let data = fs.readFileSync(filePath, "utf8");
    let users = JSON.parse(data);
      
    // находим максимальный id
    const id = Math.max.apply(Math,users.map(function(o){return o.id;}))
    // увеличиваем его на единицу
    user.id = id+1;
    // добавляем пользователя в массив
    users.push(user);
    data = JSON.stringify(users);
    // перезаписываем файл с новыми данными
    fs.writeFileSync("users.json", data);
    res.send(user);
});




//my text --END










app.listen(port, function(){
    console.log("Сервер ожидает подключения...");
});