import { withBemMod } from '@bem-react/core';
import './Link_color_default.scss';

import { cnLink } from '../Link';

export const withLinkColorDefault = withBemMod(cnLink(), { color: 'default'});
