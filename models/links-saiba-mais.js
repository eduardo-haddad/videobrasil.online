const Sequelize = require('sequelize');

const sequelize = require('../db/db');

const LinkSaibaMais = sequelize.define('links_saibamais', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title_pt: Sequelize.STRING(1024),
    title_en: Sequelize.STRING(1024),
    url_pt: Sequelize.STRING(1024),
    url_en: Sequelize.STRING(1024),
    blank: {
        type: Sequelize.TINYINT(1),
        defaultValue: 1
    },
    download: {
        type: Sequelize.TINYINT(1),
        defaultValue: 0
    },
    text_replacement_pt: Sequelize.TEXT,
    text_replacement_en: Sequelize.TEXT
}, {
    tableName: "vbo_links_saibamais",
    timestamps: true
});

module.exports = LinkSaibaMais;