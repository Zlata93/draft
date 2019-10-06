import React from 'react';
import { cn } from '@bem-react/classname';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import { codeStyle } from './styles';
import './Editor.scss';

import IconPlus from '../IconPlus/IconPlus';

SyntaxHighlighter.registerLanguage('javascript', js);

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
            <SyntaxHighlighter
                style={codeStyle}
                showLineNumbers
                // lineNumberContainerStyle={{ paddingRight: '15px' }}
                lineNumberStyle={{ color: '#c7c7c7' }}
            >
                {isLoading ? 'Loading...' : (code || 'Could not open the file')}
            </SyntaxHighlighter>
        </div>
    );
};

export default Editor;