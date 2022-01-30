const express = require('express')
const app = express()
const port = 3000
const sqlite3 = require('sqlite3').verbose();


let db = new sqlite3.Database('base.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the chinook database.');
  });



  db.serialize(() => {
    db.each(`CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER PRIMARY KEY,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        phone TEXT NOT NULL UNIQUE
    )`, (err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log(row.id + "\t" + row.name);
    });
  });


let sql = 'SELECT * FROM users';


db.serialize(() => {
    db.each('SELECT * FROM users', (err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log(row.first_name +"\t" + row.phone);
    });
  });










app.get('/', (req, res) => {
  res.send('<script>let a</script>Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


