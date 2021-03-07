const Sequelize = require('sequelize');

const sequelize = require('../db/db');

const Edition = sequelize.define('edition', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title_pt: {
        type: Sequelize.STRING(1024),
        allowNull: false
    },
    title_en: Sequelize.STRING(1024),
    subtitle_pt: Sequelize.STRING(1024),
    subtitle_en: Sequelize.STRING(1024),
    main_preview_custom_title_pt: Sequelize.STRING(2048),
    main_preview_custom_title_en: Sequelize.STRING(2048),
    current: {
        type: Sequelize.TINYINT(1),
        defaultValue: 0
    },
    group_programs: {
        type: Sequelize.TINYINT(1),
        defaultValue: 0
    },
    bg_color: {
        type: Sequelize.STRING(45),
        defaultValue: '#FFFFFF'
    },
    bg_img_desktop: Sequelize.STRING(1024),
    bg_img_mobile: Sequelize.STRING(1024),
    videos_to_show: {
        type: Sequelize.INTEGER,
        defaultValue: 3
    }
}, {
    freezeTableName: true,
    tableName: "vbo_edition",
    timestamps: true
});

module.exports = Edition;