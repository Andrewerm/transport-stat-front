import {App, Button, Col, Layout, Menu, Row, Space, Typography} from 'antd';
import {FC, useContext, useEffect, useState} from "react";
import {Outlet, useNavigate} from 'react-router-dom';
import axios, {AxiosError} from "axios";
import {IGetUserData, IResponseFromServer, IVehicle, IVehiclesList} from "../types";
import {AjaxRoutes} from "../configs/ajaxRoutes";
import {ProfileDataContext} from "../hooks/ProfileData";

const {Header, Footer, Content} = Layout;
const {Title} = Typography


export const MainLayout: FC = () => {
    const navigate = useNavigate()
    const {notification} = App.useApp();
    const {clearDataUser} = useContext(ProfileDataContext);
    const logout = () => {
        axios.post<IResponseFromServer<null>>(AjaxRoutes.LOGOUT, {}, {withCredentials: true})
            .then((response) => {
                notification.success({message: response.data.message})
                clearDataUser()
                navigate(AjaxRoutes.ROUTE_LOGIN, {replace: true})
            })
            .catch((err: AxiosError<IResponseFromServer<null>>) => {
                notification.error({message: err.response?.data.message || err.message})
            })
    }

    return <>
        <Header>
                <Button onClick={logout}>Выход</Button>
        </Header>
        <Content>
            <Outlet/>
        </Content>
    </>

}
