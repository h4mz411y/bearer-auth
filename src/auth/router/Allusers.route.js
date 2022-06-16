'use strict';
const express = require('express');
const getUsersRouters=express.Router();
const {users}=require('../models/user.model');
const bearerAuth = require('../middleware/bearer');




module.exports=async(req,res,next)=>{
  try {
      const userRecords = await users.findAll({});
      const UserNameOnly = userRecords.map(user => user.username);
      res.status(200).json(UserNameOnly);
    } catch (e) {
      console.error(e);
      next(e);
    }
}