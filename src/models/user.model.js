'use strict';

require("dotenv").config();
// const {sequelize,DataTypes}=require("../../index.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.API_SECRET || "hamza";
const userModel = (sequelize, DataTypes) =>{
const users =  sequelize.define("users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique : true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          role: {
            type: DataTypes.ENUM('admin', 'writer', 'editor', 'user'),
            defaultValue: 'user',
          },
          token: {
            type: DataTypes.VIRTUAL,
            get() {return jwt.sign({ username: this.username }, SECRET);
          }
    },
    actions: {
        // {'read', 'create', 'update', 'delete'}
        //('read','create','update','delete')
        type: DataTypes.VIRTUAL,
        get() {
            //acl >>> access control list
            const acl = {
                user: ['read'],
                writer: ['read', 'create'],
                editor: ['read', 'create', 'update'],
                admin: ['read', 'create', 'update', 'delete']
            }
            return acl[this.role];
        } }},{ 
        sequelize,
        tableName: 'users',
        timestamps: false,
        });
   

users.authenticateBasic = async function (username, password) {
    const user = await users.findOne({ where: { username: username } })
    const valid = await bcrypt.compare(password, user.password)
    if (valid) {
        let newToken = jwt.sign({ username: user.username }, SECRET);

        user.token = newToken;
        return user;
    }
    else {
        throw new Error("Invalid user");
    }
}

users.authenticateBearer = async function (token) {
    const parsedToken = jwt.verify(token, SECRET);
    const user = await users.findOne({ where: { username: parsedToken.username } });
    if (user.username) {
        return user;
    } else {
        throw new Error("Invalid Token");
    }
}
}
module.exports = userModel;