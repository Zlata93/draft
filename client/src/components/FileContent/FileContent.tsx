import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { compose } from '@bem-react/core';
import { AppState } from "../../store";

import { withSectionIndentHXxl0 } from '../Section/_indent-h/Section_indent-h_xxl0';
import { withEditorBorderFaded } from '../Editor/_border/Editor_border_faded';
import { withSectionIndentHXxl } from '../Section/_indent-h/Section_indent-h_xxl';
import { withSectionIndentVM } from '../Section/_indent-v/Section_indent-v_m';
import BranchNav from '../BranchNav/BranchNav';
import Tabs from '../Tabs/Tabs';
import SectionPresenter from '../Section/Section';
import EditorPresenter from '../Editor/Editor';

const SectionEditor = compose(withSectionIndentHXxl0, withSectionIndentVM)(SectionPresenter);
const Section = compose(withSectionIndentHXxl)(SectionPresenter);
const Editor = compose(withEditorBorderFaded)(EditorPresenter);

const tabs2 = [
    {
        id: 1,
        name: 'details'
    },
    // {
    //     id: 2,
    //     name: 'history'
    // }
];

export interface FileContentProps {
    onSelectBranch: () => {};
    onTabClick: () => {};
    activeTab: number;
    fileName: string;
    lastCommit?: string;
    file?: string;
}

const FileContent: FC<FileContentProps> = ({ onSelectBranch, lastCommit, activeTab, onTabClick, fileName, file }) => {
    const isLoading = useSelector((state: AppState) => state.file).isFetching;

    return (
        <>
            <Section indentH='xxl'>
                <BranchNav onSelect={onSelectBranch} lastCommit={lastCommit}/>
                <Tabs tabs={tabs2} activeTab={activeTab} handleClick={onTabClick}/>
            </Section>
            <SectionEditor indentH='xxl0' indentV='m'>
                <Editor
                    border='faded'
                    headerColor='default'
                    headerIndentH='m'
                    headerIndentV='s'
                    fileName={fileName}
                    isLoading={isLoading}
                    code={file}
                />
            </SectionEditor>
        </>
    );
};

export default FileContent;
