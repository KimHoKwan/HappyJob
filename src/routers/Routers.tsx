import { RouteObject, createBrowserRouter } from 'react-router-dom';
import { Login } from '../pages/Login';
import { DashBoard } from '../component/layout/DashBoard/DashBoard';
import { NotFound } from '../component/common/NotFound/NotFound';
import { Notice } from '../pages/Notice';
import { NoticeRouter } from '../component/page/Notice/NoticeRouter/NoticeRouter';

const routers: RouteObject[] = [
    // path : URL 경로를 정의하고, 이 경로에 맞는 컴포넌트를 element속성에 지정합니다.
    // element : 해당 경로에 대응하는 React 컴포넌트를 렌더링합니다.
    // children : 중첩된 라우트를 설정하여, 부모 라우트 하위에 자식 라우트를 배치합니다.
    { path: '*', element: <NotFound /> },
    { path: '/', element: <Login /> },
    {
        path: '/react',
        element: <DashBoard />,
        children: [
            { 
                path: 'board', children: [
                    { path: 'notice.do', element: <Notice /> },
                    { path: 'notice.do/:noticeIdx', element: <NoticeRouter /> }
                ]
            }
        ],
    },
];

// createBrowserRouter : 브라우저의 URL을 기반으로 동작하는 라우터를 생성합니다.
export const Routers = createBrowserRouter(routers);
