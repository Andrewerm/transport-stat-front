import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {App as AppAnt, ConfigProvider} from 'antd';
import {BrowserRouter} from 'react-router-dom';
import {ProfileData} from "./hooks/ProfileData";
import {antCustoms} from "./configs/antCustoms";

import 'dayjs/locale/ru'
import ruRU from 'antd/es/locale/ru_RU';
import dayjs from 'dayjs';
import './configs/mock';


dayjs.locale('ru');
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <ProfileData>
        <ConfigProvider theme={antCustoms} locale={ruRU}>
            <AppAnt>
                <BrowserRouter basename="/transport-stat-front">
                    <App/>
                </BrowserRouter>
            </AppAnt>
        </ConfigProvider>
    </ProfileData>
);
