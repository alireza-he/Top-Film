import React, {useRef, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import styles from "./slider.module.css";
import {Pagination, Navigation} from "swiper";
import Link from "next/link";
import {Button} from "react-bootstrap";
import classNames from "classnames";

const HeaderSlider = () => {
    return (
        <div>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className={styles.slider}
            >
                <SwiperSlide>
                    <img className={styles.img_slider} src={'/assets/slider/slide1.jpg'} alt="slide1.jpg"/>
                    <div className={classNames(styles.text_img_slider, "text-center")}>
                        <h2 className={styles.img_white}>عنوان فیلم</h2>
                        <p>توضیحات فیلم</p>
                        <Link href={"/films/film1"}>
                            <Button variant="success">
                                تماشای فيلم
                            </Button>
                        </Link>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}

export default HeaderSlider