const express = require('express');
const app = express();
const multer = require('multer');
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');
const INVALID_PARAM_ERROR = 400;
const SERVER_ERROR = 500;

app.use(multer().none());
app.use(express.static('public'));
app.get('/newGame', async function (req, res) {
  try {
    let name = req.query.name;
    let size = req.query.size;
    let player_id = await getPlayerID(name);
    console.log(player_id);
  } catch (err) {
    console.log(err);
    res.status(SERVER_ERROR).send("Server error!");
  }
});

async function getPlayerID(name) {
  let db = await getDBConnection();
  let sql = `SELECT player_id
             FROM players
             WHERE name = '${name}'`;
  let result = await db.all(sql);
  if (result.length === 0) {
    sql = `INSERT INTO players (name)
           VALUES(?)`;
    await db.run(sql, [name]);
    sql = `SELECT player_id
           FROM players
           WHERE name = '${name}'`;
    result = await db.all(sql);
  }
  db.close();
  
  return result[0].player_id;
}

async function getDBConnection() {
  const db = await sqlite.open({
    filename: 'zoomingo.db',
    driver: sqlite3.Database
  });

  return db;
}


const PORT = process.env.PORT || 8080;
app.listen(PORT);