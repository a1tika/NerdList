const express =  require("express");
const mongoose = require("mongoose")

const authRoutes = require('./routes/login.js');


const app = express();


app.use('/auth' , authRoutes);              // user authentication


const PORT = 25000;
const serverStarted = () => {
    console.log("server started at http://localhost:" + PORT);
};

app.listen(PORT, serverStarted);