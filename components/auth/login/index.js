import React, {useContext} from "react";
import styles from "./login.module.css";
import {Button, Form, Input} from "antd";
import axios from "axios";
import {toast} from "react-toastify";
import {AuthContext} from "../../../store/auth";
import {useRouter} from "next/router";

const layout = {
    labelCol: {span: 0},
    wrapCol: {span: 24}
}

const LoginForm = ({setStatus}) => {
    const router = useRouter();
    const {setAuthNewState} = useContext(AuthContext);

    return (
        <div className="p-4">
            <Form
                layout="vertical"
                name="login"
                {...layout}
                onFinish={(value) => {
                    console.log(value)
                    axios.post("/api/auth/login", value).then(res => {
                        axios.post("/api/auth/user", {user: res.data.user}).then(res => {
                            window.localStorage.setItem("user", JSON.stringify(res.data.user))
                            if (res.data.token) {
                                setAuthNewState({token: res.data.token, user: res.data.user})
                                toast.success("شما با موفقیت وارد شدید")
                                router.push("/")
                            }
                        }).catch(err => {
                            console.log(err)
                        })
                    }).catch(err => {
                        if (err.response) {
                            toast.error(err.response.data.error)
                        } else {
                            toast.error("مشکلی رخ داده است!")
                        }
                    })
                }}
                onFinishFailed={(err) => {
                    toast.warning("لطفا فیلد های الزامی را وارد کنید")
                }}
            >
                <Form.Item
                    label="نام کاربری"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "لطفا نام کاربری خود را وارد کنید"
                        },
                        {
                            min: 5,
                            message: "نام کاربری باید بیش از 5 حرف باشد!"
                        },
                        {
                            pattern: /^[A-Za-z][a-zA-Z0-9_-]+$/,
                            message: "نام کاربری نباید شامل حروف غیر انگلیسی و معتبر باشد!",
                        },
                        {
                            whitespace: true,
                            message: "فاصله ابتدای متن نامعتبر است!",
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="رمز عبور"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "لطفا رمز عبور خود را وارد کنید!"
                        },
                        {
                            min: 6,
                            message: "رمز عبور باید بیش از 6 حرف باشد!"
                        },
                        {
                            whitespace: true,
                            message: "فاصله ابتدای متن نامعتبر است!",
                        },
                    ]}
                >
                    <Input.Password/>
                </Form.Item>
                <Form.Item className="text-center mb-0">
                    <Button htmlType="submit" className={styles.submit_btn}>
                        ورود
                    </Button>
                    <br/>
                    <Button
                        type="link"
                        className="mt-4"
                        onClick={() => setStatus(false)}
                    >
                        ثبت نام نکرده اید ؟
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default LoginForm