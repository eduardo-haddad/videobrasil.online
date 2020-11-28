/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import HoverImage from 'react-hover-image';
import colors from '../styles/colors';
import BP from '../styles/breakpoints';

import VideoPlayer from './video.component';
import playPrev from '../assets/img/play_prev.png';
import playPrevHv from '../assets/img/play_prev_hv.png';
import saibaMais from '../assets/img/saiba_mais.png';
import saibaMaisHv from '../assets/img/saiba_mais_hv.png';
import setaNext from '../assets/img/arrow_next.png';
import setaPrev from '../assets/img/arrow_prev.png';

// Slick
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <img
            src={setaNext}
            alt="next"
            className={className}
            style={{
                ...style,
                right: '0.6vw',
                width: '1vw',
                height: 'auto',
            }}
            onClick={onClick}
        />
    );
}

function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <img
            src={setaPrev}
            alt="prev"
            className={className}
            style={{
                ...style,
                zIndex: '1',
                left: '0.6vw',
                width: '1vw',
                height: 'auto',
            }}
            onClick={onClick}
        />
    );
}

export default function ListaDocs(props) {
    const lang = props.lang ? props.lang : 'pt';
    const videoList = props.lista.data.videos;
    console.log(props.lista);
    const isMobile = useMediaQuery({ query: '(max-width: 767.99px)' });

    const [showPlayer, setShowPlayer] = useState(false);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [vimeoOptions, setVimeoOptions] = useState({
        autoplay: true,
        controls: true,
        id: null,
        current_video: null,
        texttrack: lang,
    });

    // #1 set current video
    const playerHandler = (video, isProgram = false, group = null) => {
        let videoId = video.id;

        if(isProgram && group !== null){
            let groupedIds = [];
            let firstVideoFromGroup = null;

            group[video.id].map(value => {
                groupedIds.push(value.id);
            });
            console.log(groupedIds);

            setCurrentVideo(videoList.filter((video) => video.program)[0]);
        } else {
            setCurrentVideo(videoList.filter((video) => video.id == videoId)[0]);
        }
    };

    // #2 vimeo options with data from clicked video
    useEffect(() => {
        if (currentVideo != null) {
            setVimeoOptions({
                autoplay: true,
                controls: true,
                id: currentVideo.id,
                current_video: currentVideo,
                texttrack: lang,
            });
        }
    }, [currentVideo]);

    // #3 show player
    useEffect(() => {
        if (vimeoOptions.id != null) {
            props.setMenuMobileShow(false);
            setShowPlayer(true);
        }
    }, [vimeoOptions]);

    // #4 close player
    const closePlayer = () => {
        setShowPlayer(false);
        setCurrentVideo(null);
    };

    const PreviewContainer = styled.div`
        ${BP.small} {
            div {
                height: 25vh;
            }
        }
    `;

    let buttonStyle = {
        height: '1.8vw',
        marginLeft: '0.2vw',
        [BP.small]: {
            // marginLeft: '0.5vw',
            height: 25,
        },
    };

    let absoluteStyle = {
        padding: '14% 16%',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        [BP.small]: {
            padding: '20% 10%',
        },
    };

    const BasePreview = styled.div`
        width: 100%;
        padding-bottom: 40.1%;
        margin-bottom: 0.5%;
        background: url(${(props) => props.bg}) center/cover no-repeat;
        color: white;
        position: relative;
        h3 {
            text-transform: none;
        }
        button {
            border: none;
            position: relative;
        }
        ${BP.small} {
            min-height: 274px;
            margin-bottom: 0.33rem;
            height: calc(75vh - 86px);
            padding-bottom: unset;
            display: flex;
            justify-content: center;
            align-items: flex-end;
        }
    `;

    const MainPreview = (props) => {
        const [hovered, setHovered] = useState(false);

        return (
            <BasePreview
                bg={props.bg}
                onClick={props.onClick}
                onMouseEnter={() => {
                    setHovered(true);
                }}
                onMouseLeave={() => {
                    setHovered(false);
                }}
            >
                <div css={absoluteStyle}>
                    {React.Children.map(props.children, (child, i) => {
                        if (i === 0) return <h1>{child}</h1>;
                        if (i === 1)
                            return (
                                <div
                                    css={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        [BP.small]: {
                                            display: 'block',
                                        },
                                    }}
                                >
                                    <h3
                                        css={{
                                            margin: '0.4vw 0 0',
                                            position: 'relative',
                                            top: '-0.4vh',
                                            marginRight: '0.3vw',
                                            [BP.small]: {
                                                position: 'unset',
                                            },
                                        }}
                                    >
                                        {child}
                                    </h3>
                                    <img
                                        alt=""
                                        src={hovered ? playPrevHv : playPrev}
                                        css={buttonStyle}
                                    />
                                    <Link to="/saibamais">
                                        <HoverImage
                                            alt=""
                                            src={saibaMais}
                                            hoverSrc={saibaMaisHv}
                                            css={buttonStyle}
                                        />
                                    </Link>
                                </div>
                            );
                        return null;
                    })}
                </div>
            </BasePreview>
        );
    };

    const ThumbPreview = (props) => {
        const [hovered, setHovered] = useState(false);

        const buttonStyleThumb = {
            ...buttonStyle,
            margin: '0 auto',
            display: 'block',
            zIndex: 999,
        };

        const absoluteStyleThumb = {
            ...absoluteStyle,
            padding: '0.33rem',
            display: 'flex',
            justifyContent: 'space-between',
            [BP.small]: null,
        };

        return (
            <BasePreview
                css={css`
                    width: 32.95%;
                    padding-bottom: 11.1%;
                    display: inline-block;
                    margin-bottom: 0;
                    height: 9.5vw;
                    p {
                        font: normal 0.8em FedraMono;
                    }
                    &:hover {
                        box-shadow: inset 0 0 0 0.2vw #fff;
                    }
                    ${BP.small} {
                        min-height: unset;
                        width: 100%;
                    }
                `}
                onMouseEnter={() => {
                    setHovered(true);
                }}
                onMouseLeave={() => {
                    setHovered(false);
                }}
                onClick={props.click}
                {...props}
            >
                <div css={absoluteStyleThumb} onClick={() => props.onClick}>
                    <div css={{ width: '100%' }}>
                        {props.children}
                        <div
                            style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                top: 0,
                                left: 0,
                            }}
                        >
                            <div
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}
                            >
                                <img
                                    alt=""
                                    src={hovered ? playPrevHv : playPrev}
                                    style={{
                                        position: 'relative',
                                        transform: 'translateY(-50%)',
                                        WebkitTransform: 'translateY(-50%)',
                                        msTransform: 'translateY(-50%)',
                                        top: '50%',
                                    }}
                                    css={buttonStyleThumb}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </BasePreview>
        );
    };

    if (videoList && videoList.length > 0) {
        // Main video

        const main = videoList[0];
        const main_video = [
            <MainPreview
                bg={main[lang].poster}
                key={0}
                onClick={(e) => playerHandler(main.id)}
            >
                {main[lang].title}
                {props.lista.data.season[lang].title
                    ? props.lista.data.season[lang].title
                    : main[lang].subtitle}
            </MainPreview>,
        ];

        // Thumbs

        // Group programs
        let videos = [];

        if(props.lista.data.group_programs){
            let programs = props.lista.data.programs;
            let groupedVideos = [];
            programs.map((value) => {
                let filteredVideos = videoList.filter(video => video.program == value.id)
                if(filteredVideos.length > 0){
                    groupedVideos[value.id] = filteredVideos;
                }
            });
            console.log(programs);

            if (programs.length > 1) {
                videos.push(
                    programs.map((value, index) => {
                        return (
                            <ThumbPreview
                                bg={value[lang].poster}
                                key={index}
                                onClick={() => playerHandler(value, true, groupedVideos)}
                            >
                                <h5>{value[lang].title}</h5>
                                <p>{value[lang].category}</p>
                            </ThumbPreview>
                        );
                    })
                );
            }
            
        } else {
            if (videoList.length > 1) {
                videos.push(
                    videoList.map((value, index) => {
                        if (index > 0) {
                            return (
                                <ThumbPreview
                                    bg={value[lang].poster}
                                    key={index}
                                    onClick={() => playerHandler(value, false)}
                                >
                                    <h5>{value[lang].title}</h5>
                                    <p>{value[lang].category}</p>
                                </ThumbPreview>
                            );
                        } else {
                            return null;
                        }
                    })
                );
            }
        }

        if (!showPlayer) {
            let slickOptions = {
                dots: false,
                infinite: false,
                speed: 500,
                slidesToShow: 3,
                slidesToScroll: 1,
                nextArrow: <NextArrow />,
                prevArrow: <PrevArrow />,
            };

            if (isMobile) {
                slickOptions = {
                    ...slickOptions,
                    arrows: false,
                };
            }

            return (
                <React.Fragment>
                    {main_video}
                    <PreviewContainer>
                        <Slider {...slickOptions}>{videos}</Slider>
                    </PreviewContainer>
                </React.Fragment>
            );
        } else {
            if (vimeoOptions.id != null) {
                return (
                    <VideoPlayer
                        {...props}
                        closePlayer={closePlayer}
                        changeVideo={playerHandler}
                        videoList={props.lista}
                        vimeoOptions={vimeoOptions}
                        lang={lang}
                    />
                );
            }
            return <div>Loading</div>;
        }
    } else {
        return (
            <div>
                <MainPreview>
                    <h1 css={css({ color: colors.vermelho })}>Loading</h1>
                    <h3>&nbsp;</h3>
                    <button>Saiba +</button>
                </MainPreview>
                <ThumbPreview>
                    <h5>Loading</h5>
                    <p>&nbsp;</p>
                </ThumbPreview>
            </div>
        );
    }
}
