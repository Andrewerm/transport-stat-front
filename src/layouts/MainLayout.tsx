import {App, Button, Layout} from 'antd';
import {FC, useContext, useState} from "react";
import {Outlet, useNavigate} from 'react-router-dom';
import axios, {AxiosError} from "axios";
import {IResponseFromServer} from "../types";
import {AjaxRoutes} from "../configs/ajaxRoutes";
import {ProfileDataContext} from "../hooks/ProfileData";

const {Header, Content} = Layout;


export const MainLayout: FC = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const {notification} = App.useApp();
    const {clearDataUser} = useContext(ProfileDataContext);
    const logout = () => {
        setLoading(true)
        axios.post<IResponseFromServer<null>>(AjaxRoutes.LOGOUT, {}, {withCredentials: true})
            .then((response) => {
                notification.success({message: response.data.message})
                clearDataUser()
                navigate(AjaxRoutes.ROUTE_LOGIN, {replace: true})
            })
            .catch((err: AxiosError<IResponseFromServer<null>>) => {
                notification.error({message: err.response?.data.message || err.message})
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return <>
        <Header>
            <Button loading={loading} onClick={logout}>Выход</Button>
        </Header>
        <Content>
            <Outlet/>
        </Content>
    </>

}
