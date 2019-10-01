import { withBemMod } from '@bem-react/core';
import { cnArrow } from '../Arrow';
import './Arrow_state_left.scss';

export const withArrowStateLeft = withBemMod(cnArrow(), { state: 'left'});
