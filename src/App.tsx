import React, {useContext, useEffect} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import {AppLayout} from './layouts/AppLayout';
import {MainLayout} from './layouts/MainLayout';
import {StatisticPage} from "./pages/StatisticPage";
import {AuthLayout} from "./layouts/AuthLayout";
import {LoginPage} from "./pages/LoginPage";
import {NotFoundPage} from "./pages/NotFoundPage";
import {AjaxRoutes} from "./configs/ajaxRoutes";
import {ProfileDataContext} from "./hooks/ProfileData";

function App() {
    const navigate = useNavigate()
    const {getUserData} = useContext(ProfileDataContext);
    useEffect(() => {
        if (getUserData()) navigate(AjaxRoutes.HOME)
        else navigate(AjaxRoutes.ROUTE_LOGIN)
    }, [getUserData,navigate]);
    return (
        <>
            <Routes>
                <Route path="/" element={<AppLayout/>}>
                    {getUserData() && <Route path="" element={<MainLayout/>}>
                        <Route index element={<StatisticPage/>}/>
                    </Route>}
                    <Route path="sign" element={<AuthLayout/>}>
                        <Route path="login" element={<LoginPage/>}/>
                    </Route>
                    <Route path="*" element={<NotFoundPage/>}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;
