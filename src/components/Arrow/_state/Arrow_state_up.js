import { withBemMod } from '@bem-react/core';
import { cnArrow } from '../Arrow';
import './Arrow_state_up.scss';

export const withArrowStateUp = withBemMod(cnArrow(), { state: 'up'});
