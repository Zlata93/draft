import React from 'react';
import { cn } from '@bem-react/classname';
import './Editor.scss';

import IconPlus from '../IconPlus/IconPlus';

export const cnEditor = cn('Editor');

const Editor = ({ className, headerColor, headerIndentH, headerIndentV, fileName, code, isLoading }) => {
    return (
        <div className={cnEditor({}, [className])}>
            <div className={cnEditor('Header',
                { color: headerColor, indentH: headerIndentH, indentV: headerIndentV })}
            >
                <div className={cnEditor('HeaderItem')}>
                    <IconPlus
                        type='file'
                    >
                        {fileName}
                    </IconPlus>
                    {/*<span className="Editor-ByteCount">(4 347 bytes)</span>*/}
                </div>
                <div className={cnEditor('HeaderItem')}>
                    <div className={cnEditor('Action')}/>
                </div>
            </div>
            <pre className={cnEditor('Body')}>
                {isLoading ? 'Loading...' : (code || 'Could not open the file')}
            </pre>
        </div>
    );
};

export default Editor;