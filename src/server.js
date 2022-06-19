'use strict';
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();

const Error404 = require("./error-handlers/404");
const Error500 = require("./error-handlers/500");
const logger = require ("./middleware/logger");


const signinRouters=require("./router/signin.route");
const signupRouters=require("./router/signup.route");
const secretRouters=require("./router/secret.route");
const getUsersRouters=require("./router/Allusers.route");
const aclRouter=require("./router/acl.route");
const router=require("./router/router");




app.use(express.json());


app.use(signinRouters);
app.use(signupRouters);
app.use(secretRouters);
app.use(getUsersRouters);
app.use(aclRouter);
app.use(router);

app.use("*", Error404);
app.use(Error500); 

function start(PORT) {
    app.listen(PORT, () => {
        console.log(`Listen and Running on port ${PORT}`);
    });
}

module.exports = {
    app: app,
    start: start,
};