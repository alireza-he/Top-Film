import React from "react";
import {Button, Divider, Form, Switch} from "antd";
import UploadComponent from "../../../upload";
import axios from "axios";
import {toast} from "react-toastify";
import SearchFilm from "../../../search-films/search-film";

const CreateBannerPage = () => {
    const [form] = Form.useForm();

    return (
        <div className="w-100">
            <Divider>
                <h2>ایجاد بنر جدید</h2>
            </Divider>
            <Form
                form={form}
                layout="vertical"
                initialValues={{show: false}}
                onFinish={(values) => {
                    console.log(values)
                    axios.post("/api/admin/home/banner", {values}).then(res => {
                        console.log(res)
                        toast.success(`بنر با موفقیت ایجاد شد!`);
                        form.resetFields();
                    }).catch(err => {
                            console.log(err)
                            toast.error("در فرآیند ایجاد فیلم، مشکلی رخ داده است!")
                        }
                    )
                }}
                onFinishFailed={(err) => {
                    console.log(err)
                }}
                className="mb-3"
            >
                <Form.Item
                    className="text-center"
                    label="انتخاب فیلم"
                    name="film"
                    rules={[
                        {required: true, message: "فیلم مورد نظر را بارگذاری کنید!"}
                    ]}
                >
                    <SearchFilm getFilmID={id => form.setFieldsValue({film: id})}/>
                </Form.Item>
                <Form.Item
                    className="text-center"
                    label="بارگذاری بنر جدید"
                    name="banner"
                    rules={[
                        {required: true, message: "بنر را بارگذاری کنید!"}
                    ]}
                >
                    <UploadComponent
                        key="banner"
                        img={true}
                        afterUpload={value => {
                            form.setFieldsValue({banner: value[0]._id})
                        }}/>
                </Form.Item>
                <Form.Item
                    className="text-center"
                    label="وضعيت نمايش بنر جدید"
                    name="show"
                >
                    <Switch onChange={value => form.setFieldsValue({show: value})}/>
                </Form.Item>
                <Form.Item>
                    <Button block htmlType="submit" size="large">ايجاد بنر</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default CreateBannerPage