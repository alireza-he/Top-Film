import React from "react";
import styles from "./film-content.module.css"
import {Card, Col, Row} from "react-bootstrap";
import {Avatar, Divider, Tag} from "antd";


const FilmsDetails = () => {
    return (
        <div>
            <Card className="rtl">
                <Divider>عوامل فيلم</Divider>
                <Row className="mb_2rem">
                    <Col xl={1} lg={1} md={1} sm={1} xs={1}>
                        <Tag className={styles.tag}>
                            <Avatar size={32} src={"https://joeschmoe.io/api/v1/random"}/>
                            آقای بازیگر
                        </Tag>
                    </Col>
                </Row>
            </Card>
        </div>
    )
}

export default FilmsDetails