import { Modal } from 'react-bootstrap';
import { NoticeModalStyled } from './styled';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { modalState } from '../../../../stores/modalStatus';
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { loginInfoState } from '../../../../stores/userInfo';
import { ILoginInfo } from '../../../../models/interface/store/userInfo';
import axios, { AxiosHeaders, AxiosResponse } from 'axios';
import { IDetailResponse, INoticeDetail, INoticeListResponse, IPostResponse } from '../../../../models/INotice';
import { postNoticeApi } from '../../../../api/postNoticeApi';
import { Notice } from '../../../../api/api';

interface INoticeModalProps {
    onSuccess: () => void;
    noticeSeq: number;
    setNoticeSeq: (noticeSeq: number | undefined) => void;
}

export const NoticeModal: FC<INoticeModalProps> = ({ onSuccess, noticeSeq, setNoticeSeq }) => {
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [userInfo] = useRecoilState<ILoginInfo>(loginInfoState);
    const [noticeDetail, setNoticeDetail] = useState<INoticeDetail>();
    const [imageUrl, setImageUrl] = useState<string>();
    const [fileData, setFileData] = useState<File>();
    const title = useRef<HTMLInputElement>();
    const context = useRef<HTMLInputElement>();

    useEffect(() => {
        noticeSeq && searchDetail();
        
        // 컴포넌트가 닫히기직전(엄마운트 될때) 실행되는 함수(클린업 함수)
        return () => {
            noticeSeq && setNoticeSeq(undefined);
        };
    }, []);

    // 세부사항 가져오기
    const searchDetail = async () => {
        const detail = await postNoticeApi<IDetailResponse>(Notice.getDetail, { noticeSeq })

        if (detail) {
            setNoticeDetail(detail.detail);
            const { fileExt, logicalPath } = detail.detail;
            if(fileExt === "jpg" || fileExt === "gif" || fileExt === "png"){
                setImageUrl(logicalPath);
            } else{
                setImageUrl('');
            }
        }

        // 아래 axios 구문을 위에 api로 바꿈
        // axios.post('/board/noticeDetailBody.do', { noticeSeq }).then((res: AxiosResponse<IDetailResponse>) => {
        //     setNoticeDetail(res.data.detail);
        // });
    };

    const handlerModal = () => {
        setModal(!modal);
    };
    
    // 등록 기능
    const handlerSave = async () => {
        const param = {
            title: title.current.value,
            context: context.current.value,
            loginId: userInfo.loginId,
        };
        const save = await postNoticeApi<INoticeListResponse>(Notice.getSave, param);
        if(save){
            onSuccess();
        }

        // axios.post('/board/noticeSaveBody.do', param).then((res: AxiosResponse<IPostResponse>) => {res.data.result === 'success' && onSuccess();
        // });
    };

    // 파일 저장
    const handlerFileSave = async () => {
        const fileForm = new FormData();
        const textData = {
            title: title.current.value,
            context: context.current.value,
            loginId: userInfo.loginId,
        };
        fileData && fileForm.append('file', fileData);
        fileForm.append('text', new Blob([JSON.stringify(textData)], {type: 'application/json'}));
        const save = await postNoticeApi<IPostResponse>(Notice.getFileSave, fileForm);
        if (save){
            save.result === 'success' && onSuccess();
        }
        // axios.post('/board/noticeSaveBody.do', fileForm).then((res: AxiosResponse<IPostResponse>) => {
        //     res.data.result === 'success' && onSuccess();
        // });
    }

    // 수정 기능
    const handlerUpdate = async () => {
        const param = {
            title: title.current.value,
            context: context.current.value,
            noticeSeq,
        };
        const update = await postNoticeApi<INoticeListResponse>(Notice.getUpdate, param);
        if(update){
            onSuccess();
        }

        // axios.post('/board/noticeUpdateBody.do', param).then((res: AxiosResponse<IPostResponse>) => {res.data.result === 'success' && onSuccess();
        // });
    };

    // 파일 수정하기
    const handlerFileUpdate = async () => {
        const fileForm = new FormData();
        const textData = {
            title: title.current.value,
            context: context.current.value,
            loginId: userInfo.loginId,
        };
        fileData && fileForm.append('file', fileData);
        fileForm.append('text', new Blob([JSON.stringify(textData)], {type: 'application/json'}));
        const save = await postNoticeApi<IPostResponse>(Notice.getFileUpdate, fileForm);
        if (save){
            save.result === 'success' && onSuccess();
        }
    }
    

    // 삭제 기능
    const handlerDelete = async () => {
        const param = {
            noticeSeq,
        };
        const remove = await postNoticeApi<INoticeListResponse>(Notice.getDelete, param);
        if(remove){
            onSuccess();
        }

        // axios.post('/board/noticeDeleteBody.do', param)
        //     .then((res: AxiosResponse<IPostResponse>) => {res.data.result === 'success' && onSuccess();
        // });
    };
    
    // 파일 미리보기
    const handlerFile = (e: ChangeEvent<HTMLInputElement>) => {
        const fileInfo = e.target.files
        if(fileInfo?.length > 0) {
            const fileInfoSplit = fileInfo[0].name.split('.');
            const fileExtension = fileInfoSplit[1].toLowerCase();

            if(fileExtension === "jpg" || fileExtension === "gif" || fileExtension === "png"){
                setImageUrl(URL.createObjectURL(fileInfo[0]));
            } else {
                setImageUrl('');
            }
            setFileData(fileInfo[0]);
        }
    };

    return (
        <NoticeModalStyled>
            <div className="container">
                <label>
                    제목 : <input type="text" ref={title} defaultValue={noticeDetail?.title}></input>
                </label>
                <label>
                    내용 : <input type="text" ref={context} defaultValue={noticeDetail?.content}></input>
                </label>
                파일 :<input type="file" id="fileInput" style={{ display: 'none' }} onChange={handlerFile}></input>
                <label className="img-label" htmlFor="fileInput">
                    파일 첨부하기
                </label>
                <div>
                    {imageUrl ? (
                        <div>
                            <label>미리보기</label>
                            <img src={imageUrl} />
                            {fileData?.name || noticeDetail.fileName}
                        </div>
                        ) : (
                        <div>{fileData?.name}</div>
                    )}
                </div>
                <div className={'button-container'}>
                    <button onClick={noticeSeq ? handlerUpdate : handlerFileSave }>{noticeSeq ? '수정' : '등록'}</button>
                    {noticeSeq && <button onClick={ handlerDelete }>삭제</button>}
                    <button onClick={handlerModal}>나가기</button>
                </div>
            </div>
        </NoticeModalStyled>
    );
};
