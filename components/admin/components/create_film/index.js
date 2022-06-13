import React from "react";
import {Button, Divider, Form, Input, InputNumber, Select} from "antd";
import moment from "moment-jalaali";
import UploadComponent from "../../../upload";
import axios from "axios";
import {toast} from "react-toastify";
import categories from "../../../../util/categories.json"

const {Option} = Select;

const CreatMediaPage = () => {
    const [form] = Form.useForm();

    return (
        <div className="w-100">
            <Divider>
                <h2>ایجاد فیلم جدید</h2>
            </Divider>
            <Form
                form={form}
                layout="vertical"
                onFinish={(values) => {
                    console.log(values)
                    axios.post("/api/admin/films/create", {values}).then(res => {
                        console.log(res)
                        toast.success(`فیلم ${res.data.name} با موفقيت ايجاد شد!`);
                        form.resetFields();
                    }).catch(err => {
                            console.log(err)
                            toast.success("در فرآیند ایجاد فیلم، مشکلی رخ داده است!")
                        }
                    )
                }}
                onFinishFailed={(err) => {
                    console.log(err)
                }}
                className="mb-3"
            >
                <Form.Item
                    label="عنوان فیلم"
                    name="name"
                    rules={[{required: true, message: "عنوان فيلم را وارد کنید!"}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="توضیحات فیلم"
                    name="content"
                    rules={[
                        {required: true, message: "توضیحات فيلم را وارد کنید!"},
                        {
                            min: 30,
                            message: "توضیحات فیلم می بایست بیش از 30 حرف باشد"
                        },
                        {max: 500, message: "توضيحات فيلم می بایست کمتر از 500 حرف باشد"}
                    ]}
                >
                    <Input.TextArea/>
                </Form.Item>
                <Form.Item
                    label="امتياز IMDB"
                    name="score"
                    rules={[{required: true, message: "امتیاز IMDB فيلم را وارد کنید!"}]}
                >
                    <InputNumber className="w-100" min={0} max={10}/>
                </Form.Item>
                <Form.Item
                    label="سال ساخت"
                    name="created"
                    rules={[
                        {required: true, message: "سال ساخت فيلم را وارد کنید!"},
                    ]}
                >
                    <InputNumber className="w-100" min={1330} max={parseInt(moment(new Date()).format("jYYYY")) + 1}/>
                </Form.Item>
                <Form.Item
                    label="مدت زمان (دقیقه)"
                    name="time"
                    rules={[{required: true, message: "مدت زمان فيلم را وارد کنید!"}]}
                >
                    <InputNumber className="w-100" min={0}/>
                </Form.Item>
                <Form.Item
                    label="ژانر فیلم"
                    name="category"
                    rules={[{required: true, message: "ژانر فيلم را وارد کنید!"}]}
                >
                    <Select>
                        {
                            categories.cats.map(({value, text}, index) =>
                                <Option value={value} key={index}>{text}</Option>)
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    className="text-center"
                    label="بارگذاری پوستر فیلم"
                    name="poster"
                    rules={[
                        {required: true, message: "پوستر فيلم را وارد کنید!"}
                    ]}
                >
                    <UploadComponent key="poster" img={true} afterUpload={value => {
                        form.setFieldsValue({poster: value[0]._id})
                    }}/>
                </Form.Item>
                <Form.Item
                    className="text-center"
                    label="بارگذاری فیلم"
                    name="film"
                    rules={[
                        {required: true, message: "فایل فيلم را وارد کنید!"}
                    ]}
                >
                    <UploadComponent
                        key="film"
                        afterUpload={value => {
                            form.setFieldsValue({film: value[0]._id})
                        }}/>
                </Form.Item>
                <Form.Item>
                    <Button block htmlType="submit" size="large">ايجاد فيلم</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default CreatMediaPage