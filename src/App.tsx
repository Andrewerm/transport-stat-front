import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {AppLayout} from './layouts/AppLayout';
import {MainLayout} from './layouts/MainLayout';
import {StatisticPage} from "./pages/StatisticPage";
import {AuthLayout} from "./layouts/AuthLayout";
import {LoginPage} from "./pages/LoginPage";
import {NotFoundPage} from "./pages/NotFoundPage";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<AppLayout/>}>
                    <Route path="" element={<MainLayout/>}>
                        <Route index element={<StatisticPage/>}/>
                    </Route>
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
