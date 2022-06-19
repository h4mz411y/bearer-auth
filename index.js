'use strict';
require('dotenv').config();
let PORT = process.env.PORT || 3000;
const server=require("./src/server");
const {db}=require("./src/models/index.model");

db.sync().then(() => {
        // start();
        server.start(PORT);
    }).catch(console.error);