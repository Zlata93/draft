import React, { FC } from 'react';
import { compose } from '@bem-react/core';
import { cn } from '@bem-react/classname';
import './Footer.scss';

import LinkPresenter from '../Link/Link';
import { withLinkColorDefault } from '../Link/_color/Link_color_default';

export const cnFooter = cn('Footer');

const Link = compose(withLinkColorDefault)(LinkPresenter);

const Footer: FC<{}> = () => {
    return (
        <footer className={cnFooter()}>
            <div className={cnFooter('Item')}>
                Trade secrets of Yandex LLC. 16, Lev Tolstoy Str., Moscow, Russia, 119021
            </div>
            <div className={cnFooter('Item')}>
                <div className={cnFooter('Version')}>UI: 0.1.15</div>
                <div>
                    © 2007—2019&nbsp;
                    <Link
                        color='default'
                        href="https://www.yandex.ru"
                        target="_blank"
                        className={cnFooter('Link')}
                    >
                    Yandex
                </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
