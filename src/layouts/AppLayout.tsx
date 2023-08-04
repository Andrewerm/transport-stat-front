import {Outlet} from "react-router-dom";
import {Layout} from 'antd';
import React from "react";
import {App as AppAnt} from 'antd';

export const AppLayout: React.FC = () => {
    const layoutStyle: React.CSSProperties = {
        // height: '100vh'
        // minHeight: '100vh'
    }
    return (
        <>
            <AppAnt>
                <Layout style={layoutStyle}>
                    <Outlet/>
                </Layout>
            </AppAnt>
        </>
    )
}
