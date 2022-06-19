'use strict';
require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const foodModel = require('./food.model');
const ingredientsModel = require('./Ingredients.model');
const Collection = require('./collection-class');
const userModel = require('./user.model');


const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;
let sequelizeOptions =process.env.NODE_ENV === "production"
        ? {
            dialect: 'postgres',
            protocol: 'postgres',
            dialectOptions: {
                ssl: { require: true, rejectUnauthorized: false },
                native: true
            },
        }
        : {};

let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);

const foodTable = foodModel(sequelize, DataTypes);
const ingredientsTable = ingredientsModel(sequelize, DataTypes);
const userTable = userModel(sequelize, DataTypes);


const foodCollection = new Collection(foodTable);
const ingredientsCollection = new Collection(ingredientsTable);


foodTable.hasMany(ingredientsTable, {
    foreignKey: "foodId",
    sourceKey: "id"
});

ingredientsTable.belongsTo(foodTable, {
    foreignKey: "foodId",
    targetKey: "id",
});


module.exports = {
    db: sequelize,
    foodTable: foodCollection,
    ingredientsTable: ingredientsCollection,
    users: userTable
}; 