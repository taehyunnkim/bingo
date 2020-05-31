'use strict';
const fs = require('fs').promises;
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

async function getDBConnection() {
  const db = await sqlite.open({
    filename: 'zoomingo.db',
    driver: sqlite3.Database
  });

  return db;
}

async function createTable() {
    const db = await getDBConnection();
    const sql = await fs.readFile('setup.sql', 'utf8');
    // const sql2 = await fs.readFile('scenarios.sql', 'utf8');
    await db.exec(sql);
    // await db.exec(sql2);
}

async function queryData() {
    const sql = `SELECT *
                 FROM game_state;`;

    const db = await getDBConnection();
    let rows = await db.all(sql);
    console.log('cleared and created');
}

createTable().then(queryData);