const express = require("express");
const authRoutes = require("./routes/app.route");
const cookie_parser = require("cookie-parser");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/user.route");

app.use(express.json());
app.use(cookie_parser())
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/resora/auth",authRoutes)
app.use("/resora/update",userRoutes)




module.exports = app;