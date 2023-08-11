import {App, Button, Form, Input, InputRef, Typography} from 'antd';
import {useNavigate} from "react-router-dom";
import {AjaxRoutes} from "../configs/ajaxRoutes";
import axios, {AxiosError} from "axios";
import React, {useContext, useEffect, useRef, useState} from "react";
import {IGetUserData, IResponseFromServer} from "../types";
import {loginParams} from "../configs/testLogin";
import {ProfileDataContext} from "../hooks/ProfileData";

const {Title} = Typography;


export const LoginPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<InputRef>(null);
    const [form] = Form.useForm();
    if (process.env.NODE_ENV === 'development')
        form.setFieldsValue(loginParams);
    const navigate = useNavigate()
    const {notification} = App.useApp();
    const {setDataUser} = useContext(ProfileDataContext);
    useEffect(() => {
        if (inputRef.current) inputRef.current.focus()
    }, [])
    const onFinish = () => {
        setLoading(true)
        axios.post<IResponseFromServer<IGetUserData>>(AjaxRoutes.LOGIN, form.getFieldsValue(), {withCredentials: true})
            .then((response) => {
                notification.success({message: response.data.message})
                if (response.data.data?.user_data) {
                    setDataUser(response.data.data.user_data)
                    navigate(AjaxRoutes.HOME, {replace: true})
                } else {
                    navigate(AjaxRoutes.ROUTE_LOGIN, {replace: true})
                    notification.error({message: 'Некорректный формат профиля пользователя'})
                }
            })
            .catch((err: AxiosError<IResponseFromServer<null>>) => {
                notification.error({message: err.response?.data.message || err.message})
            })
            .finally(() => {
                setLoading(false)
            })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            <Title level={5}>Авторизация</Title>
            <Form
                form={form}
                name="basic"
                layout="vertical"
                style={{maxWidth: 600}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{required: true, type: 'email', message: 'Пожалуйста введите email!'}]}
                >
                    <Input
                        placeholder="Введите Email или телефон"
                        ref={inputRef}
                    />
                </Form.Item>

                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[{required: true, message: 'Пожалуйста введите пароль!'}]}
                >
                    <Input.Password/>
                </Form.Item>

                {/*<Form.Item name="remember" valuePropName="checked" wrapperCol={{span: 16}}>*/}
                {/*    <Checkbox>Remember me</Checkbox>*/}
                {/*</Form.Item>*/}

                <Form.Item>
                    <Button loading={loading} type="primary" block htmlType="submit">
                        Войти
                    </Button>
                </Form.Item>
                {/*<Form.Item>*/}
                {/*    <Link to={AjaxRoutes.ROUTE_REMIND_PASSWORD}>Забыли пароль?</Link><p/>*/}
                {/*</Form.Item>*/}
            </Form>
        </>
    )
}
