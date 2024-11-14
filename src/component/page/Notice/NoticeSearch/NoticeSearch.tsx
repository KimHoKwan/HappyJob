import { NoticeSearchStyled } from './styled';
import { Button } from '../../../common/Button/Button';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecoilState, useRecoilState } from 'recoil';
import { modalState } from '../../../../stores/modalStatus';

export const NoticeSearch = () => {
    const title = useRef<HTMLInputElement>();
    const [startDate, setStartDate] = useState<string>();
    const [endDate, setEndDate] = useState<string>();
    const navigate = useNavigate();
    const [modal, setModal] = useRecoilState<boolean>(modalState);

    useEffect(() => {
        window.location.search && navigate(window.location.pathname, { replace : true });
    }, [navigate]);

    // 검색버튼 클릭 시 주소값 변경
    const handlerSearch = () => {
        const query:string[] = [];

        !title.current.value || query.push(`searchTitle=${title.current.value}`);
        !startDate || query.push(`searchStTitle=${startDate}`);
        !endDate || query.push(`searchEdTitle=${endDate}`);

        const queryString = query.length > 0 ? `?${query.join('&')}` : '';
        navigate(`/react/board/notice.do${queryString}`);
    };

    const handlerModal = () => {
        setModal(!modal);
    }

    return (
        <NoticeSearchStyled>
            <div className="input-box">
                <input ref={title}></input>
                <input type="date" onChange={(e) => setStartDate(e.target.value)}></input>
                <input type="date" onChange={(e) => setEndDate(e.target.value)}></input>
                <Button onClick={handlerSearch}>검색</Button>
                <Button onClick={handlerModal}>등록</Button>
            </div>
        </NoticeSearchStyled>
    );
};
