const connection = require("../db/conn");

// ^ INDEX
function index(req, res) {
  const sql = "SELECT * FROM movies_db.movies";

  connection.query(sql, (err, results) => {
    console.log(results);
  });

  res.json({
    status: "OK",
    movies: results,
  });
}

module.exports = { index };
