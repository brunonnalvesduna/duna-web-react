import { lazy } from 'react';

// project imports
import MainLayout from '../layout/MainLayout';
import Loadable from '../ui-component/Loadable';

// sample page routing
const RenderTest = Loadable(lazy(() => import('../views/renderTest')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (
        <MainLayout />
    ),
    children: [
        {
            path: '/',
            element: <RenderTest />
        },
        {
            path: '/sample-page',
            element: <RenderTest />
        },
    ]
};

export default MainRoutes;
