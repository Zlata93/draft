import { withBemMod } from '@bem-react/core';
import { cnArrow } from '../Arrow';
import './Arrow_state_right.scss';

export const withArrowStateRight = withBemMod(cnArrow(), { state: 'right'});
