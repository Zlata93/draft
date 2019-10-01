import { withBemMod } from '@bem-react/core';
import { cnSelect } from '../Select';
import './Select_weight_bold.scss';

export const withSelectWeightBold = withBemMod(cnSelect(), { weight: 'bold'});
