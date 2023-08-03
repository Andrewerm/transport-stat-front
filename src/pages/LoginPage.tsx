import {Typography, Button, Form, Input, InputRef, App} from 'antd';
import {Link, useNavigate} from "react-router-dom";
import {AjaxRoutes} from "../configs/ajaxRoutes";
import axios, {AxiosError} from "axios";
import React, {useContext, useEffect, useRef} from "react";
import {IErrorFromServer, IUserProfile} from "../types";

const {Title} = Typography;

export interface IGetLogin {
    user_data: IUserProfile
}

export const LoginPage: React.FC = () => {
    const inputRef = useRef<InputRef>(null);
    const [form] = Form.useForm();
    if (process.env.NODE_ENV==='development') form.setFieldsValue({ email: 'a.m.vinokurov@gmail.com', password: '123456789' });
    const navigate = useNavigate()
    const {notification} = App.useApp();
    useEffect(() => {
        if (inputRef.current) inputRef.current.focus()
    }, [])
    const onFinish = () => {
        axios.post<IGetLogin>(AjaxRoutes.LOGIN, form.getFieldsValue(),  { withCredentials: true })
            .then(response => {
                navigate(AjaxRoutes.HOME, {replace: true})
            })
            .catch((err: AxiosError<IErrorFromServer>) => {
                notification.error({ message:err.response?.data.message||err.message})
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
                    rules={[{required: true, message: 'Пожалуйста введите email!'}]}
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
                    <Button type="primary" block htmlType="submit">
                        Войти
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Link to={AjaxRoutes.ROUTE_REMIND_PASSWORD}>Забыли пароль?</Link><p/>
                </Form.Item>
            </Form>
        </>
    )
}
