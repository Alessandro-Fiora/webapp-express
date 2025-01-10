// ^ INIT EXPRESS
const express = require("express");
const app = express();

// ^ REGISTERING ROUTES
const moviesRouter = require("./routers/moviesRouter");
app.use("/movies", moviesRouter);

// ^ SERVER LISTENING
app.listen(process.env.APP_PORT, () => {
  console.log(
    `Server listening on ${process.env.APP_HOST}:${process.env.APP_PORT}`
  );
});
