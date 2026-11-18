const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: "*",
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/v1', require('./routes/index.routes'));

app.use(require('./middlewares/not-found.middleware'));
app.use(require('./middlewares/error.middleware'));

module.exports = app;