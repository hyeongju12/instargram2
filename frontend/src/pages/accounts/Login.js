import React, {useState} from 'react';
import {Form, Input, Button, notification, Card} from 'antd';
import {SmileOutlined, FrownOutlined} from "@ant-design/icons";
import Axios from "axios";
import {useHistory} from "react-router-dom";
import {setToken, useAppContext} from "../../store";
import {useLocation} from "react-router-dom";

export default function Login() {
    const { dispatch} = useAppContext();
    const location = useLocation();
    const history = useHistory();
    const [fieldErrors, setFieldErrors] = useState({});

    const {from: loginRedirectUrl} = location.state || {from : {pathname: "/"}};
    const onFinish =  values => {

        async function fn() {
            const {username, password} = values;

            setFieldErrors({});

            const data = {username, password};
            try {
                const response = await Axios.post("http://127.0.0.1:8000/accounts/token/", data);

                const {data:{token : jwtToken}} = response;

                dispatch(setToken(jwtToken));
                // setJwtToken(jwtToken);

                console.log("jwtToken :", jwtToken);

                notification.open({
                    message: "로그인 성공",
                    icon: <SmileOutlined style={{color:"green"}}/>
                });
                history.push(loginRedirectUrl);
            }
            catch(error) {
                if (error.response) {

                    notification.open({
                        message: "로그인 실패",
                        description: "아이디/암호를 확인해주세요.",
                        icon: <FrownOutlined style={{color:"#ff3333"}}/>
                    });

                    const {data: fieldsErrorMessages} = error.response;
                    setFieldErrors(Object.entries(fieldsErrorMessages).reduce((acc, [fieldName, errors]) => {
                        errors.join(" ")
                        acc[fieldName] = {
                            validateStatus: "error",
                            help: errors.join(" "),
                        }
                        return acc;
                    }, {}));
                }
            }
        }
        fn();
    };
    return (
        <Card title="login">
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                        {
                            min: 5, message: "다섯글자 입력해주세요"
                        },
                    ]}
                    hasFeedback
                    {...fieldErrors.username}
                    {...fieldErrors.non_field_errors}

                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback={
                        {...fieldErrors.password}
                    }
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}
