const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const compress = require("compression");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config();

const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const mainRouter = require("./routes/mainRouter");

// basic Configuration Middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("tiny"));
}

app.use(cors());
app.use(helmet());
app.use(compress());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// db connection
mongoose.set("useCreateIndex", true);
mongoose
  .connect(process.env.TRELLO_MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    dbName: "trello"
  })
  .catch(err => console.log(err, process.env.TRELLO_MONGODB_URI));

// routers
app.use("/api/v1/", mainRouter);

// error middleware
// app.use((err, req, res, next) => {
//   console.error(err);
//   res.status(500).json({ message: "Server Error!" });
// });

// error middleware
app.use((error, req, res, next) => {
  console.error(error.stack);
  const status = error.status || 500;
  res.status(status);
  res.send({
    error: {
      status: status,
      message: error.message || "Internal Server Error"
    }
  });
});

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
