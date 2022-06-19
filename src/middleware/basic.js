'use strict';
const {userModel} = require("../models/user.model");
const base64 = require('base-64');


async function basicAuth(req,res,next){
    if(req.headers.authorization){
    let basicHeaderParts = req.headers.authorization.split(' ');  
    let encodedString = basicHeaderParts.pop();  
    let decodedString = base64.decode(encodedString);         
    let [username, password] = decodedString.split(':'); 
    userModel.authenticateBasic(username, password)
    .then((validUser) => {
        req.user = validUser;
        
        next();
    })
    .catch((err) => {
        res.status(403);
        res.send("Invalid Signin");
    })
}
}

module.exports=basicAuth; 