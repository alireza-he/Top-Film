import React from "react";
import {Button, Form, Input, Select, Switch} from "antd";
import axios from "axios";
import {toast} from "react-toastify";

const ChangeUserDataModal = ({userData}) => {
    return (
        <div>
            <Form
                layout="vertical"
                onFinish={(values) => {
                    console.log(values)
                    axios.post("/api/admin/users/update", {values, userId: userData._id}).then(res => {
                        toast.success("تغییرات با موفقیت اعمال شد!")
                    }).catch(err => {
                        toast.error("مشکلی رخ داده است!")
                    })
                }}
                onFinishFailed={(err) => {
                    toast.error("لطفا مقادیر را بدرستی وارد کنید!")
                }}
                initialValues={{username: userData.username, role: userData.role, sub: userData.sub}}
            >
                <Form.Item name="username" label="نام کاربری">
                    <Input/>
                </Form.Item>
                <Form.Item name="role" label="نقش کاربر">
                    <Select
                        placeholder="نقش کاربر را وارد کنید "
                        allowClear
                    >
                        <Select.Option value="admin">ادمین</Select.Option>
                        <Select.Option value="user">نام كاربری</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name="sub" label="وضعیت اشتراک" valuePropName="checked">
                    <Switch/>
                </Form.Item>
                <Form.Item className="text-center">
                    <Button htmlType="submit">تغییر اطلاعات</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default ChangeUserDataModal