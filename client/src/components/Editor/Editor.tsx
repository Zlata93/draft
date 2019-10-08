import React, { FC } from 'react';
import { cn } from '@bem-react/classname';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { codeStyle } from './styles';
import './Editor.scss';

import IconPlus from '../IconPlus/IconPlus';

export interface EditorProps {
    className?: string;
    headerColor: string;
    headerIndentH: string;
    headerIndentV: string;
    fileName: string;
    code: string;
    isLoading: boolean;
}

export const cnEditor = cn('Editor');

const Editor: FC<EditorProps> = ({ className, headerColor, headerIndentH, headerIndentV, fileName, code, isLoading }) => {

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
                lineNumberStyle={{ color: '#c7c7c7' }}
            >
                {isLoading ? 'Loading...' : (code || 'Could not open the file')}
            </SyntaxHighlighter>
        </div>
    );
};

export default Editor;
