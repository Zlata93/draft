import { withBemMod } from '@bem-react/core';
import { cnEditor } from '../Editor';
import './Editor_border_ghost.scss';

export const withEditorBorderGhost = withBemMod(cnEditor(), { border: 'ghost'});