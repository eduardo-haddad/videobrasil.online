const Sequelize = require('sequelize');

const sequelize = require('../db/db');

const SeasonType = sequelize.define('season_type', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title_pt: {
        type: Sequelize.STRING(1024),
        allowNull: false,
    },
    title_en: Sequelize.STRING(1024)
}, {
    tableName: "vbo_season_type",
    timestamps: true
});

module.exports = SeasonType;