const Sequelize = require('sequelize');

const sequelize = require('../db/db');

const VideoProgram = sequelize.define('video_program', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title_pt: Sequelize.STRING(1024),
    title_en: Sequelize.STRING(1024),
    category_pt: Sequelize.STRING,
    category_en: Sequelize.STRING,
    poster_pt: Sequelize.STRING(1024),
    poster_en: Sequelize.STRING(1024),
    thumb_pt: Sequelize.STRING(1024),
    thumb_en: Sequelize.STRING(1024),
    main_video: {
        type: Sequelize.TINYINT(1),
        defaultValue: 0
    }
}, {
    tableName: "vbo_video_program",
    timestamps: true
});

module.exports = VideoProgram;