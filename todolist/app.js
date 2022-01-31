const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const cors = require('cors');
const e = require('express');
const app = express();
const port = 3000;
const jsonParser = express.json();


app.use(cors());
app.options("*",cors());
app.use(express.json());



let db = new sqlite3.Database('todobase.db', (err) => {
    if(err){
        console.log(err.message);
    }
    else {
        console.log("Connected to the todolist.db.");
    }
});

let sql;





app.use(express.static(__dirname + "/public"));

app.get("/api/tasks", (req, res) => {
    sql = "Select * from Tasks";
    db.serialize(
        () => {
            db.all(sql, (err, rows) => {
                if(err) {
                    console.log(err.message);
                }
                else{
                   res.send(rows);
                }
            });
        }
    );

})

app.get("/api/task/:id", (req, res) => {
    sql = `SELECT * FROM Tasks WHERE taks_id = ${req.params.id}`;

    db.get(sql, (err, rows) => {
        if(err) {
            console.log(err);
        }
        else {
            res.send(rows);
        }
    })
    
})

app.post("/api/newtask", jsonParser, (req, res) => {
    //sql = `INSERT INTO "Tasks" ("title", "content") VALUES ("${title}","${content}");`
    //res.send(req.params.title +" + "+ req.params.content);
    //res.send(req.body.title);
    let title = req.body.title;
    res.send(req.body);
    console.log(req.body);

})





app.listen(port, () => {
    console.log("Todolist is running...")
})
