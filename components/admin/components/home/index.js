import React from "react";
import {Card, Col, Row} from "react-bootstrap";
import useSWR from "swr"
import {toast} from "react-toastify";

const fetcher = (url) => fetch(url).then((res) => res.json());

const HomeAdminComponent = () => {
    const {data, error} = useSWR("/api/admin/home/count", fetcher)

    if (error){
        toast.error("دریافت اطلاعات با مشکل مواجه شد!")
        return <div>مشكلي رخ داده است!</div>
    }

    if (!data){
        return <div>در حال بارگزاری ...</div>
    }
    return (
        <Row className="w-100">
            <Col xs={12} sm={6} md={4} lg={3}>
                <Card
                    className="rtl text-center"
                    style={{minHeight:"200px"}}
                    text="light"
                    bg="success"
                >
                    <Card.Header>تعداد کاربران</Card.Header>
                    <Card.Body>
                        <h3 className="text-white">{data.users}</h3>
                        <h2 className="text-white">کاربر</h2>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={12} sm={6} md={4} lg={3}>
                <Card
                    className="rtl text-center"
                    style={{minHeight:"200px"}}
                    text="light"
                    bg="danger"
                >
                    <Card.Header>تعداد فیلم ها</Card.Header>
                    <Card.Body>
                        <h3 className="text-white">{data.films}</h3>
                        <h2 className="text-white">فیلم</h2>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={12} sm={6} md={4} lg={3}>
                <Card
                    className="rtl text-center"
                    style={{minHeight:"200px"}}
                    text="light"
                    bg="secondary"
                >
                    <Card.Header> </Card.Header>
                    <Card.Body>در حال به روزرسانی</Card.Body>
                </Card>
            </Col>
            <Col xs={12} sm={6} md={4} lg={3}>
                <Card
                    className="rtl text-center"
                    style={{minHeight:"200px"}}
                    text="light"
                    bg="dark"
                >
                    <Card.Header> </Card.Header>
                    <Card.Body>در حال به روزرسانی</Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default HomeAdminComponent