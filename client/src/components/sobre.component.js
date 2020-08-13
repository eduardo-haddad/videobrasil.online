/** @jsx jsx */
import { Component } from 'react';
import { css, jsx } from '@emotion/core';
import axios from 'axios';
import colors from '../styles/colors';

import AboutSession from './about-session.component';

export default class Sobre extends Component {
    constructor(props) {
        super(props);
        this.state = { data: null };
    }

    componentDidMount() {
        axios.get('/api/sobre').then((res) => {
            this.setState({ data: res.data });
        });
    }

    render() {
        return (
            <div className="sobre limite">
                <div
                    css={css`
                        flex: 1 5 0;
                    `}
                />
                <div
                    css={css({
                        color: colors.vermelho,
                        flex: '5 1 0',
                    })}
                >
                    {this.state.data ? (
                        <div>
                            <AboutSession>
                                <h4>{this.state.data.pt.title}</h4>
                            </AboutSession>
                            <AboutSession>
                                <p>{this.state.data.pt.content}</p>
                                <p>{this.state.data.pt.content}</p>
                            </AboutSession>
                            {this.state.data.partnersLogos ? (
                                <AboutSession>
                                    <p
                                        css={css`
                                            font: bold 0.8em FedraMono !important;
                                            text-transform: uppercase;
                                        `}
                                    >
                                        {this.state.data.pt.partners}:
                                    </p>
                                    <div
                                        css={css`
                                            margin-top: 28px;
                                            display: flex;
                                            justify-content: space-between;
                                            width: ${this.state.data
                                                .partnersLogos.length * 55}px;
                                        `}
                                    >
                                        {this.state.data.partnersLogos.map(
                                            (value, index) => (
                                                <img
                                                    alt=""
                                                    src={value}
                                                    key={index}
                                                />
                                            )
                                        )}
                                    </div>
                                </AboutSession>
                            ) : null}
                        </div>
                    ) : (
                        <div className="sobre">
                            <p>Carregando</p>
                        </div>
                    )}
                </div>
                <div
                    css={css`
                        flex: 1 5 30px;
                    `}
                />
            </div>
        );
    }
}
