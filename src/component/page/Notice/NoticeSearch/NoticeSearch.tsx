import { NoticeSearchStyled } from './styled';
import { Button } from '../../../common/Button/Button';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecoilState, useRecoilState } from 'recoil';
import { modalState } from '../../../../stores/modalStatus';
import { NoticeContext } from '../../../../api/provider/NoticeProvier';
import { start } from 'repl';

export const NoticeSearch = () => {
    // const title = useRef<HTMLInputElement>();
    // const [startDate, setStartDate] = useState<string>();
    // const [endDate, setEndDate] = useState<string>();
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const navigate = useNavigate();
    const { setSearchKeyWord } = useContext(NoticeContext);

    const [searchValue, setSearchValue ] = useState<{ searchTitle:string; searchStDate:string; searchEdDate:String}>({
        searchTitle: '',
        searchStDate: '',
        searchEdDate: '',
    });


    useEffect(() => {
        window.location.search && navigate(window.location.pathname, { replace : true });
    }, []);

    // 검색버튼 클릭 시 주소값 변경
    // const handlerSearch = () => {
    //     const query:string[] = [];

    //     !title.current.value || query.push(`searchTitle=${title.current.value}`);
    //     !startDate || query.push(`searchStTitle=${startDate}`);
    //     !endDate || query.push(`searchEdTitle=${endDate}`);

    //     const queryString = query.length > 0 ? `?${query.join('&')}` : '';
    //     navigate(`/react/board/notice.do${queryString}`);
    // };

    const handlerSearch = () => {

        setSearchKeyWord(searchValue);
    };

    const handlerModal = () => {
        setModal(!modal);
    }

    return (
        <NoticeSearchStyled>
            <div className="input-box">
                <input onChange={(e) => setSearchValue({ ...searchValue, searchTitle:e.target.value })}></input>
                <input type='date' onChange={(e) => setSearchValue({ ...searchValue, searchStDate:e.target.value })}></input>
                <input type='date' onChange={(e) => setSearchValue({ ...searchValue, searchEdDate:e.target.value })}></input>
                <Button onClick={handlerSearch}>검색</Button>
                <Button onClick={handlerModal}>등록</Button>
            </div>
        </NoticeSearchStyled>
    );
};
