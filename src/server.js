'use strict';
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();

const Error404 = require("./error-handlers/404");
const Error500 = require("./error-handlers/500");

const signinRouters=require("./auth/router/signin.route");
const signupRouters=require("./auth/router/signup.route");
const secretRouters=require("./auth/router/secret.route");
const getUsersRouters=require("./auth/router/Allusers.route");

app.use(express.json());
app.use(signinRouters);
app.use(signupRouters);
app.use(secretRouters);
app.use(getUsersRouters);

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