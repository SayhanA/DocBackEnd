const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors({
    origin: "*",
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/api/v1', require('./routes/index.routes'));

app.use(require('./middlewares/not-found.middleware'));
app.use(require('./middlewares/error.middleware'));

module.exports = app;