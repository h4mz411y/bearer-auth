'use strict';
const express = require('express');
const getUsersRouters=express.Router();
const {users}=require('../models/user.model');
const bearerAuth = require('../middleware/bearer');


getUsersRouters.get('/users',bearerAuth,async(req,res,next)=>{
    try {
        const userRecords = await users.findAll({});
        const UserName = userRecords.map(user => user.username);
        res.status(200).json(UserName);
      } catch (e) {
        console.error(e);
        next(e);
      }
})


module.exports=getUsersRouters;