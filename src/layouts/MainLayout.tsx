import {Col, Layout, Menu, Row, Space, Typography} from 'antd';
import { FC } from "react";
import { Outlet } from 'react-router-dom';
const {Header, Footer, Content} = Layout;


export const MainLayout:FC = () => {

    return <>
        {/*<Header>header</Header>*/}
        <Content>
            <Outlet/>
        </Content>
    </>

}
