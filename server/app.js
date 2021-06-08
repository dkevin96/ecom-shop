const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const morgan = require("morgan");
const config = require("./config");
const routes = require("./routes");
const passport = require("passport");
require("./config/passport");
const cookieSession = require("cookie-session");
const app = express();

app.use(cors({ origin: true, credentials: true })); //allow cross-origin resource sharing FROM origin ONLY, and accept credentials

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(morgan("dev"));
app.use(passport.initialize());
app.use("/api", routes);

app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    },
  });
});

// view engine setup
app.use(express.static(path.join(__dirname, "./client/build")));
if (process.env.NODE_ENV === "production") {
  // only use in development
  app.use(express.static(path.join(__dirname, "./client/build")));
}

// redirect all route not writen in routes.js to index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(config.port, () =>
  console.log(`Server listening on port ${config.port}`)
);
