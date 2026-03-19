const express = require("express");
const cookie_parser = require("cookie-parser");
const app = express();
const cors = require("cors");



const authRoutes = require("./routes/app.route");
const userRoutes = require("./routes/user.route");
const PostRoutes = require("./routes/post.route");



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
app.use("/resora",PostRoutes)




module.exports = app;