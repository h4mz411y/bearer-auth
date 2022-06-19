"use strict";
const Ingredients = (sequelize, DataTypes) =>
    sequelize.define("Ingredients", {
        MainIngredients: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        Spice: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

module.exports = Ingredients;