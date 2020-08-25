/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import colors from '../styles/colors';

import Botao from './botao.component';

import bigPlay from '../assets/img/big_play.png';
import smallPlay from '../assets/img/sm_play.png';
import hvSmallPlay from '../assets/img/hv_sm_play.png';
import hvBigPlay from '../assets/img/hv_big_play.png';

export default function ListaDocs(props) {
    const video_list = props.lista.data.videos;
    const lang = props.lang ? props.lang : 'pt';

    const previewMargin = '0.5%';

    const DocPreviewContainer = styled.div`
        display: flex;
        justify-content: space-between;
        @media (max-width: 992px) {
            flex-direction: column;
            > div {
                margin-bottom: ${previewMargin};
            }
            > div:last-child {
                margin-bottom: 0px;
            }
        }
    `;

    const DocPreviewMain = styled.div`
        width: 100%;
        padding-bottom: 43.5%;
        margin-bottom: ${previewMargin};
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
        @media (max-width: 992px) {
            margin-bottom: 6px;
            height: calc(100vh - 74px);
            padding-bottom: unset;
        }
    `;

    const DocPreviewThumb = (localProps) => (
        <DocPreviewMain
            css={css`
                width: 32.95%;
                padding-bottom: 11.1%;
                display: inline-block;
                margin: 0 0 0 0;
                p {
                    font: normal 0.8em FedraMono;
                }
                &:hover {
                    box-shadow: inset 0px 0px 0px 2px #fff;
                }
                @media (max-width: 992px) {
                    width: 100%;
                    height: 130px;
                }
            `}
            {...localProps}
        />
    );

    const Absolute = styled.div`
        padding: ${(props) => props.padding && props.padding};
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: ${(props) => (props.flex ? 'flex' : 'block')};
        justify-content: center;
    `;

    const PlayButton = (props) => {
        return (
            <Link
                css={{
                    margin: 'auto',
                    width: props.size,
                    height: props.size,
                    '@media (max-width: 992px)': {
                        width: props.msize,
                        height: props.msize,
                    },
                }}
                to="/video"
            >
                <div
                    css={css({
                        cursor: 'pointer',
                        background: `url(${props.imagem}) center/100% no-repeat`,
                        width: '99%',
                        height: '99%',
                        position: 'relative',
                        zIndex: 1,
                        '&:hover': {
                            background: `url(${props.hvimagem}) center/100% no-repeat`,
                        },
                        '@media (max-width: 992px)': {
                            '&:hover': {
                                background: `url(${props.imagem}) center/100% no-repeat`,
                            },
                        },
                    })}
                    onClick={props.click}
                />
            </Link>
        );
    };

    function Lista() {
        if (video_list && video_list.length > 0) {
            // Main video
            const main = video_list[0];
            const main_video = [
                <DocPreviewMain bg={main[lang].poster} key={0}>
                    <Absolute flex>
                        <PlayButton
                            click={() => props.playVideo(main)}
                            imagem={bigPlay}
                            hvimagem={hvBigPlay}
                            size={'5vw'}
                            msize={'15vw'}
                        />
                    </Absolute>
                    <Absolute padding={'13% 9%'}>
                        <div
                            css={{
                                '@media (min-width: 993px)': { width: '50%' },
                            }}
                        >
                            <h1>{main[lang].title}</h1>
                            <h3>{main[lang].subtitle}</h3>
                            <Link to="/saibamais">
                                <Botao>Saiba +</Botao>
                            </Link>
                        </div>
                    </Absolute>
                </DocPreviewMain>,
            ];

            // Thumbs
            let videos = [];
            if (video_list.length > 1) {
                videos.push(
                    video_list.map((value, index) => {
                        if (index > 0) {
                            return (
                                <DocPreviewThumb
                                    bg={value[lang].poster}
                                    key={index}
                                >
                                    <Absolute flex>
                                        <PlayButton
                                            click={() => props.playVideo(value)}
                                            imagem={smallPlay}
                                            hvimagem={hvSmallPlay}
                                            size={'3vw'}
                                            msize={'10vw'}
                                        />
                                    </Absolute>
                                    <Absolute padding={'2%'}>
                                        <div
                                            css={{
                                                width: '50%',
                                            }}
                                        >
                                            <h5>{value[lang].title}</h5>
                                            <p>{value[lang].category}</p>
                                        </div>
                                    </Absolute>
                                </DocPreviewThumb>
                            );
                        }
                    })
                );
            }

            return (
                <React.Fragment>
                    {main_video}
                    <DocPreviewContainer>{videos}</DocPreviewContainer>
                </React.Fragment>
            );
        } else {
            return (
                <div>
                    <DocPreviewMain>
                        <h1 css={css({ color: colors.vermelho })}>Loading</h1>
                        <h3>&nbsp;</h3>
                        <button>Saiba +</button>
                    </DocPreviewMain>
                    <DocPreviewThumb>
                        <h5>Loading</h5>
                        <p>&nbsp;</p>
                    </DocPreviewThumb>
                </div>
            );
        }
    }

    return (
        <div>
            <div className="lista-docs">{Lista()}</div>
        </div>
    );
}
