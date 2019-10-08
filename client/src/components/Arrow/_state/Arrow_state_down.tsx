import { withBemMod } from '@bem-react/core';
import { cnArrow } from '../Arrow';
import './Arrow_state_down.scss';

export const withArrowStateDown = withBemMod(cnArrow(), { state: 'down'});
