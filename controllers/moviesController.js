const connection = require("../db/conn");

// ^ INDEX
function index(req, res) {
  let sql = "SELECT id, title, director, genre, image FROM movies";

  //* RESEARCH FILTERS
  let queryParams = [];
  let firstFilter = true;

  if (req.query.title) {
    sql += ` ${firstFilter ? "WHERE" : "AND"} title LIKE ?`;
    queryParams.push(`%${req.query.title}%`);
    firstFilter = false;
  }

  if (req.query.director) {
    sql += ` ${firstFilter ? "WHERE" : "AND"} director LIKE ?`;
    queryParams.push(`%${req.query.director}%`);
    firstFilter = false;
  }

  connection.query(sql, queryParams, (err, results) => {
    // Query error handler
    if (err) {
      console.log(err);
      return res.status(500).json({
        status: "KO",
        message: "Database query failed",
      });
    }
    // Movie image path map
    const movies = results.map((movie) => ({
      ...movie,
      image: generateMovieImagePath(movie.image),
    }));
    // RESPONSE
    res.json({
      status: "OK",
      movies,
    });
  });
}

// ^ SHOW
function show(req, res) {
  const movieId = req.params.id;
  const sqlMovie =
    "SELECT id, title, director, genre, release_year, abstract, image FROM movies WHERE id = ?";

  connection.query(sqlMovie, [movieId], (err, movieResults) => {
    // Query error handler
    if (err) {
      console.log(err);
      return res.status(500).json({
        status: "KO",
        message: "Database query failed",
      });
    }
    const [movie] = movieResults;

    // Movie id not found handler
    if (!movie) {
      return res.status(404).json({
        status: "KO",
        message: "Movie not found",
      });
    }

    movie.image = generateMovieImagePath(movie.image);

    const sqlReviews =
      "SELECT id, name, vote, text FROM reviews WHERE movie_id = ?";
    connection.query(sqlReviews, [movieId], (err, reviewsResults) => {
      // Query error handler
      if (err) {
        console.log(err);
        return res.status(500).json({
          status: "KO",
          message: "Database query failed",
        });
      }
      movie.reviews = reviewsResults;

      // RESPONSE
      res.json({
        status: "OK",
        movie,
      });
    });
  });
}

const generateMovieImagePath = (imageName) =>
  `${process.env.APP_HOST}:${process.env.APP_PORT}/movies_cover/${imageName}`;

module.exports = { index, show };
