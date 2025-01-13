// ^ INIT EXPRESS
const express = require("express");
const cors = require("cors");
const corsOptions = {
  origin: process.env.APP_FRONTEND_URL,
  optionSuccessStatus: 200,
};
const app = express();

// ^ REGISTERING MIDDLEWARES
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static("public"));

// ^ REGISTERING ROUTES
const moviesRouter = require("./routers/moviesRouter");
app.use("/api/movies", moviesRouter);

// ^ ERROR HANDLERS
const errorsHandler = require("./middlewares/errorsHandler");
const notFound = require("./middlewares/notFound");
app.use(errorsHandler);
app.use(notFound);

// ^ SERVER LISTENING
app.listen(process.env.APP_PORT, () => {
  console.log(
    `Server listening on ${process.env.APP_HOST}:${process.env.APP_PORT}`
  );
});
