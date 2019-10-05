import { withBemMod } from '@bem-react/core';
import { cnEditor } from '../Editor';
import './Editor_border_faded.scss';

export const withEditorBorderFaded = withBemMod(cnEditor(), { border: 'faded'});
