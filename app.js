var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
var session = require("express-session");

const methodOverride = require("method-override");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var categoriesRouter = require("./routes/categories");
var productsRouter = require("./routes/products");
var billsRouter = require("./routes/bills");
var profileRouter = require("./routes/profile");
var loginRouter = require("./routes/login");
var registerRouter = require("./routes/register");
var apiRouter = require("./routes/api");

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "asmquanlybanhangcualuan",
    resave: true,
    saveUninitialized: true,
  })
);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/categories", categoriesRouter);
app.use("/products", productsRouter);
app.use("/bills", billsRouter);
app.use("/profile", profileRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/api", apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  if (req.originalUrl.indexOf("/api") == 0) {
    res.json({
      status: err,
      msg: err.message,
    });
  } else {
    // render the error page
    res.render("error");
  }
});

module.exports = app;
