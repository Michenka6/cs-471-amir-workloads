const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const filePath = 'long_script.sql';
const src = fs.readFileSync(filePath, 'utf8');

const initSqlJs = require('sql.js');

initSqlJs().then(SQL => {
  // C BINDED
  const db0 = new sqlite3.Database('mydatabase.db', (err) => {
    if (err) {
        console.error('Could not open database:', err.message);
    } else {
        console.log('Connected to SQLite database');
    }
  });

  db0.run(src, (err) => {
      if (err) {
          console.error('ERROR: COULD NOT RUN SRC', err.message);
      }
  });

  db0.close(() => {})

  // WASM IMPLEMENTATION
  // const db = new SQL.Database();
  //
  // db.run(src)
  //
  // const result = db.exec("SELECT * FROM test");
  // console.log(result[0].values);
});
