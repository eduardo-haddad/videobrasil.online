const Sequelize = require('sequelize');

const sequelize = require('../db/db');

const Video = sequelize.define('video', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    vimeo_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    order: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    title_pt: Sequelize.STRING(1024),
    title_en: Sequelize.STRING(1024),
    subtitle_pt: Sequelize.STRING(1024),
    subtitle_en: Sequelize.STRING(1024),
    main_preview_html_pt: Sequelize.TEXT,
    main_preview_html_en: Sequelize.TEXT,
    title_box_pt: Sequelize.STRING(1024),
    title_box_en: Sequelize.STRING(1024),
    poster_pt: Sequelize.STRING(1024),
    poster_en: Sequelize.STRING(1024),
    thumb_pt: Sequelize.STRING(1024),
    thumb_en: Sequelize.STRING(1024),
    category_pt: Sequelize.STRING,
    category_en: Sequelize.STRING,
    specs_pt: Sequelize.TEXT,
    specs_en: Sequelize.TEXT,
    caption_pt: Sequelize.TEXT,
    caption_en: Sequelize.TEXT,
}, {
    freezeTableName: true,
    tableName: "video",
    timestamps: true
});

module.exports = Video;