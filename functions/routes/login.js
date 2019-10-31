const express = require('express');
const request = require('request');
const mongoose = require("mongoose");


const app = express.Router();
const googleUrl = 'https://oauth2.googleapis.com/tokeninfo?id_token=';
const mongoURL = "mongodb://localhost:27017/NerdList";
mongoose.connect(mongoURL);

var db = mongoose.connection;

db.on('error', console.error.bind(console,'MongoDB connection error : '));


app.post('/login' , googleLogin);

function googleLogin(req,response) {

    //console.log(req.query.idToken);
    let idToken = req.query.idToken;
    //console.log("idtoken = " + idToken);
    //console.log(response);

    if(idToken==undefined){

        return response.status(400).json({
            success : false,
            message: "Usage [POST] idToken = token"
        })
    }

    request(googleUrl+idToken , {json : true }, function(err,res,body) {
        //console.log(err);
        //console.log(res);
        if(err) {
            return response.status(406).json({
                success : false,
                message : "could not make request to google",
                err : err
            })
        }

        //console.log(body.error_description);

        if(body.error_description != undefined) {

            return response.status(400).json({
                message: "empty/invalid token",
                error: 'unauthenticated request',
                success: false
            })
        }

        let sub = body.sub;
        let name = body.name;
        let email = body.email;
        let picture = body.picture;

        console.log(sub,name,email,picture);
        return;

    });

}



module.exports = app;