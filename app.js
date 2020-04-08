const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const covidRoute = require("./routes/covid19.js");
const morgan = require("morgan");
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/on-covid19/logs", morgan("dev"));
app.use(morgan("dev"));

app.get("/", (req, res) => res.send("Hello World!"));
app.use("/api/v1", covidRoute);
app.listen(port, () => console.log(`app listening on port ${port}!`));
