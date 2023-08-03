import {Outlet} from "react-router-dom";
import {Layout, Row, Col} from 'antd';
import React from "react";

const {Content, Sider} = Layout;

export const AuthLayout:React.FC=()=>{
    const contentStyle: React.CSSProperties = {
        textAlign: 'center',
        // minHeight: 120,
        // lineHeight: '120px',
        // height: 100vh,
        // color: '#fff',
        // backgroundColor: '#108ee9',
        // position: 'absolute',
        // top: '50%',
        // transform: 'translateY(-50%)',
    };

    const siderStyle: React.CSSProperties = {
        textAlign: 'center',
        // lineHeight: '120px',
        color: '#fff',
        backgroundColor: '#0960E6',
    };
    // const layoutStyle: React.CSSProperties = {
    //     // height: '100vh'
    //     minHeight: '100vh'
    //
    // }
    return (
        <Layout >
            <Content style={contentStyle}>
                <Row justify="center" align="middle" style={{minHeight: '100vh'}}>
                    <Col>
                        <Outlet/>
                    </Col>
                </Row>
            </Content>
        </Layout>
    )
}
