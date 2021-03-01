const seasonType = {
    pt: 'artista',
    en: 'artist',
};

exports.getListaDocs = (req, res, next) => {
    data = {
        season: {
            pt: {
                type: seasonType['pt'],
                title: '' // if filled, value is shown in the main preview's subtitle
            },
            en: {
                type: seasonType['en'],
                title: ''
            },
        },
        // Group programs for curatorship season
        group_programs: false,
        bg_color: '#ffffff',
        bg_img_desktop: '',
        bg_img_mobile: '',
        programs: [
            {
                id: 0, // Use id: 0 for the main video's group only
                pt: { title: '', category: '', poster: '', thumb: '' },
                en: { title: '', category: '', poster: '', thumb: '' }
            },
        ],
        videos: [
            {
                id: '517277054',
                order: 1,
                program: 0,
                pt: {
                    title: '',
                    subtitle: 'Próxima exposição',
                    main_preview_html: '<h3 style="text-transform:lowercase !important">dia 08 de março</h3>',
                    title_box: 'Próxima exposição dia 8 de março', // Replaces title in player (info button)
                    poster: '/img/vb_red.png',
                    thumb: '/img/vb_red.png',
                    category: '',
                    specs: ``,
                    caption: ``,
                },
                en: {
                    title: '',
                    subtitle: 'Next exhibition',
                    main_preview_html: '<h3>on March 8</h3>',
                    title_box: 'Next exhibition on March 8', // Replaces title in player (info button)
                    poster: '/img/vb_red.png',
                    thumb: '/img/vb_red.png',
                    category: '',
                    specs: ``,
                    caption: ``,
                },
            },
        ],
    };
    res.status(200).json(data);
};
