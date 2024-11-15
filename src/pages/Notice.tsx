import React, { createContext, FC, useState } from 'react';
import { ContentBox } from '../component/common/ContentBox/ContentBox';
import { NoticeMain } from '../component/page/Notice/NoticeMain/NoticeMain';
import { NoticeSearch } from '../component/page/Notice/NoticeSearch/NoticeSearch';

interface Context {
    searchKeyWord: object;
    setSearchKeyWord: (keyWord: object) => void;
}

const defaultValue: Context = {
    searchKeyWord: {},
    setSearchKeyWord: () => {},
};

const NoticeContext = createContext(defaultValue);

const NoticeProvider: FC<{ children: React.ReactNode | React.ReactNode[] }> = ({ children }) => {
    const [searchKeyWord, setSearchKeyWord] = useState({});
    return <NoticeContext.Provider value={{ searchKeyWord, setSearchKeyWord }}>{children}</NoticeContext.Provider>;
};


export const Notice = () => {
    return (
        <>
            <NoticeProvider>
                <ContentBox>공지사항</ContentBox>
                <NoticeSearch />
                <NoticeMain />
            </NoticeProvider>
        </>
    );
};
