'use strict';
const express = require('express');
const secretRouters=express.Router();
const bearerAuth=require('../middleware/bearer');


secretRouters.get('/secret',bearerAuth,(req,res)=>{
    res.status(200).json({
        'message': 'authorized ',
        'user': req.user
    });})



module.exports=secretRouters;