import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { RouterProvider } from 'react-router-dom';
import { Routers } from './routers/Routers';

// 루트 DOM 요소를 찾고, 리액트 앱을 연결할 준비를 합니다.
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// 리엑트 에플리케이션 랜더링 시작
root.render(
    <RecoilRoot>
        {/*
            RouterProvide :URL이 변경되어도 페이지 전환이 없는 기능
            Routers : 사용자가 정의한 페이지명
        */}
        <RouterProvider router={Routers} />
    </RecoilRoot>
);
