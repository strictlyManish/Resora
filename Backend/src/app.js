const express = require("express");
const authRoutes = require("./routes/app.route");
const cookie_parser = require("cookie-parser");
const app = express();


app.use(express.json());
app.use(cookie_parser())

app.use("/resora/auth",authRoutes)




module.exports = app;