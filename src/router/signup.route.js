'use strict';
const express = require('express');
const signupRouters=express.Router();
const {users}=require('../models/user.model');
const bcrypt = require('bcrypt');


signupRouters.get('/',(req,res)=>{
    res.send("Home page ");
})
signupRouters.post('/signup',async(req,res)=>{
    try {
        let username = req.body.username;
        let password = await bcrypt.hash(req.body.password, 10);
        // console.log('username', username);
        // console.log('password', password);
        let role = req.body.role;
        const record = await users.create({
            username: username,
            password: password,
            role: role,
        });
        res.status(201).json(record);
        // res.json(record);

      } catch (e) { res.status(403).send('Please try again'); }

})

module.exports=signupRouters;