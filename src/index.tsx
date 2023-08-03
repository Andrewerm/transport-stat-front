import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {App as AppAnt, ConfigProvider} from 'antd';
import { BrowserRouter } from 'react-router-dom';
import {ProfileData} from "./hooks/ProfileData";
import {antCustoms} from "./configs/antCustoms";

import ruRU from 'antd/es/locale/ru_RU';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
        <ProfileData>
                <AppAnt>
                    <ConfigProvider theme={antCustoms} locale={ruRU}>
                            <BrowserRouter>
                                <App/>
                            </BrowserRouter>
                    </ConfigProvider>
                </AppAnt>
        </ProfileData>
);
