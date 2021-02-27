const Sequelize = require('sequelize');

const sequelize = require('../db/db');

const SaibaMais = sequelize.define('saibamais', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content_pt: Sequelize.TEXT,
    content_en: Sequelize.TEXT,
    replace_text: {
        type: Sequelize.TINYINT(1),
        defaultValue: 0
    },
}, {
    freezeTableName: true,
    tableName: "vbo_saibamais",
    timestamps: false
});

module.exports = SaibaMais;