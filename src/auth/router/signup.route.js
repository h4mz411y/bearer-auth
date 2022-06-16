'use strict';
const express = require('express');
const signupRouters=express.Router();
const {users}=require('../models/user.model');
const bcrypt = require('bcrypt');


signupRouters.get('/',(req,res)=>{
    res.send("use /signup , signin , ");
})
signupRouters.post('/signup',async(req,res)=>{
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const record = await users.create(req.body);
        res.status(201).json(record);
      } catch (e) { res.status(403).send('this username is already used , try again'); }

})

module.exports=signupRouters;