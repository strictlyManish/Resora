require("dotenv").config();
const app = require("./src/app");
const connect_database = require("./src/db/db");






connect_database();
app.listen(3000,()=>{
    console.log('server runnig on port 3000')
});