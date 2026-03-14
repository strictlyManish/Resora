const mongoose = require("mongoose");

const connect_database = async () =>{
    try {
        mongoose.connect(process.env.MONGOOSE_URI);
        console.log('Connected Sucessfully')
    } catch (error) {
        console.log('Connection failed')
        console.log(error)
    }
};


module.exports = connect_database;