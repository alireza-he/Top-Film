import React, {useState} from "react";
import styles from "./film-poster.module.css";
import {Button, Col, Row} from "react-bootstrap";
import classNames from "classnames";
import Link from "next/link";

const FilmsPoster = () => {
    const [dimmer, setDimmer] = useState(false);

    return (
        <Row className="rtl w-100 text-center my-5">
            <Col
                xs={12}
                md={6}
                lg={4}
                className={classNames(styles.banner,"p-1 my-2")}
                onMouseEnter={() => {
                    setDimmer(true)
                }}
                onMouseLeave={() => {
                    setDimmer(false)
                }}
            >
                <img src={"/assets/banners/banner2.jpg"} className={dimmer ? styles.banner_img_hover : undefined}
                     alt="film banner"/>
                <div
                    className={classNames(styles.text_img_slider, "text-center", dimmer ? styles.text_img_slider_hover : undefined)}>
                    <h2 className={styles.img_white}>عنوان فیلم</h2>
                    <p>توضیحات فیلم</p>
                    <Link href={"/films/film1"}>
                        <Button variant="success">
                            تماشای فيلم
                        </Button>
                    </Link>
                </div>
            </Col>
            <Col
                className={styles.banner}
                onMouseEnter={() => {
                    setDimmer(true)
                }}
                onMouseLeave={() => {
                    setDimmer(false)
                }}
            >
                <img src={"/assets/banners/banner2.jpg"} className={dimmer ? styles.banner_img_hover : undefined}
                     alt="film banner"/>
                <div
                    className={classNames(styles.text_img_slider, "text-center", dimmer ? styles.text_img_slider_hover : undefined)}>
                    <h2 className={styles.img_white}>عنوان فیلم</h2>
                    <p>توضیحات فیلم</p>
                    <Link href={"/films/film1"}>
                        <Button variant="success">
                            تماشای فيلم
                        </Button>
                    </Link>
                </div>
            </Col>
            <Col
                className={styles.banner}
                onMouseEnter={() => {
                    setDimmer(true)
                }}
                onMouseLeave={() => {
                    setDimmer(false)
                }}
            >
                <img src={"/assets/banners/banner2.jpg"} className={dimmer ? styles.banner_img_hover : undefined}
                     alt="film banner"/>
                <div
                    className={classNames(styles.text_img_slider, "text-center", dimmer ? styles.text_img_slider_hover : undefined)}>
                    <h2 className={styles.img_white}>عنوان فیلم</h2>
                    <p>توضیحات فیلم</p>
                    <Link href={"/films/film1"}>
                        <Button variant="success">
                            تماشای فيلم
                        </Button>
                    </Link>
                </div>
            </Col>
        </Row>
    )
}

export default FilmsPoster