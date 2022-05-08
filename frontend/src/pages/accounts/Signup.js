import React, {useState} from 'react';
import {Form, Input, Button, notification,} from 'antd';
import {SmileOutlined, FrownOutlined} from "@ant-design/icons";
import Axios from "axios";
import {useHistory} from "react-router-dom";

function Signup() {
    const history = useHistory();
    const [fieldErrors, setFieldErrors] = useState({});

    const onFinish = values => {
        async function fn() {
            const {username, password} = values;

            setFieldErrors({});

            const data = {username, password};
            try {
                await Axios.post("http://127.0.0.1:8000/accounts/signup/", data);

                notification.open({
                    message: "회원가입 성공",
                    description: "로그인 페이지로 이동합니다.",
                    icon: <SmileOutlined style={{color:"green"}}/>
                });
                history.push("/accounts/login");
            }
            catch(error) {
                if (error.response) {

                    notification.open({
                        message: "회원가입 실패",
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
                hasFeedback={
                    {...fieldErrors.username}
                }
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
    );
}



// const onFinishFailed = (errorInfo) => {
//     console.log('Failed:', errorInfo);
// };

export default Signup;