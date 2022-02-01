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


// GET ALL tasks
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

});


// GET SOME TASK
app.get("/api/task/:id", (req, res) => {
    sql = `SELECT * FROM Tasks WHERE id = ${req.params.id}`;

    db.get(sql, (err, rows) => {
        if(err) {
            console.log(err);
        }
        else {
            res.send(rows);
        }
    })
    
})


// add new task
app.post("/api/newtask", jsonParser, (req, res) => {
    let title = req.body.title;
    let content = req.body.content;
    let summary = 1;

    sql = `INSERT INTO "Tasks" ("title", "content") VALUES ("${title}","${content}");`;
    //sql = "select * from Tasks;";

    

    db.run(sql, function(err) {
        if (err) {
            return console.error(err.message);
        }
        else {
            
            summary = this.lastID;
            res.send(JSON.stringify(this));
            console.log(summary);
            result(summary);
        }
    });

    function result(summary){
        console.log(summary);
    }
    
    

});






app.listen(port, () => {
    console.log("Todolist is running...");
});
