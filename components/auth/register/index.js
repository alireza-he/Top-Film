import React from "react";
import styles from "./register.module.css";
import {Button, Form, Input} from "antd";
import axios from "axios";
import {toast} from "react-toastify";

const RegisterForm = ({setStatus}) => {

    const layout = {
        labelCol: {span: 0},
        wrapCol: {span: 24}
    }

    return (
        <div className="p-4">
            <Form
                layout="vertical"
                name="register"
                {...layout}
                onFinish={(value) => {
                    console.log(value);
                    if (value.password === value.re_password) {
                        const {username, password, email} = value;
                        const values = {username, password, email};
                        axios.post("/api/auth/register", values).then(res => {
                            console.log(res)
                            toast.success("ثبت نام با موفقیت انجام شد")
                        }).catch((err) => {
                            if (err.response) {
                                toast.error(err.response.data.error)
                            } else {
                                toast.error("مشکلی رخ داده است")
                            }
                        })
                    } else {
                        toast.error("تکرار رمز عبور اشتباه است!")
                    }
                }}
                onFinishFailed={(err) => {
                    toast.warning("لطفا فیلد های الزامی را وارد کنید")
                }}
            >
                <Form.Item
                    label="پست الکترونیکی"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "لطفا پست الکترونیکی خود را وارد کنید!"
                        }, {
                            type: "email",
                            message: "ایمیل وارد شده معتبر نیست!"
                        },
                        {
                            whitespace: true,
                            message: "فاصله ابتدای متن نامعتبر است!",
                        }
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="نام کاربری"
                    name="username"
                    rules={[
                        {required: true, message: "نام کاربری را وارد کنید!"},
                        {min: 5, message: "نام کاربری باید بیش از 5 حرف باشد!"},
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
                        }, {
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
                <Form.Item
                    label="تکرار رمز عبور"
                    name="re_password"
                    rules={[
                        {
                            required: true,
                            message: "لطفا تکرار رمز عبور خود را وارد کنید!"
                        }, {
                            min: 6,
                            message: "تکرار رمز عبور باید بیش از 6 حرف باشد"
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
                        ثبت نام
                    </Button>
                    <br/>
                    <Button
                        type="link"
                        className="mt-4"
                        onClick={() => setStatus(true)}
                    >
                        من میخاهم وارد شوم
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default RegisterForm