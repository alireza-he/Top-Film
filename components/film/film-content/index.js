import {Card, Divider} from "antd";
import classNames from "classnames";
import styles from "./film-content.module.css";
import Link from "next/link";
import {Button} from "react-bootstrap";
import React from "react";

const FilmsContent = ({film}) => {
    console.log(film, "film content at film")
    const {name, content, imdb_score, time, score, poster, date} = film;

    return (
        <div>
            <Card
                cover={
                    <>
                        <img
                            src={`data:${poster.media.data.contentType};base64,${new Buffer.from(poster.media.data.data).toString("base64")}`}
                            height={300}
                            style={{filter: "blur(1.5px)"}}
                            alt={poster.alt}
                        />
                        <div className={classNames(styles.text_img_slider, "text-right")}>
                            <h2 className={styles.img_white}>{name}</h2>
                            <div className="mb-3">
                                <span><img src={"/imdb.svg"} width={32} className="mx-2"
                                           alt="imdb icon"/>{imdb_score}</span>
                                <Divider type="vertical" style={{backgroundColor: "#fff"}}/>
                                <span><img src={"/clock.svg"} width={20} className="mx-2"
                                           alt="calendar icon"/>{time} دقیقه</span>
                                <Divider type="vertical" style={{backgroundColor: "#fff"}}/>
                                <span><img src={"/calendar.svg"} width={20} className="mx-2" alt="calendar icon"/>{date}</span>
                            </div>
                            <Link href={"/films/player/film1"}>
                                <Button variant="success">
                                    تماشای فيلم
                                </Button>
                            </Link>
                        </div>
                    </>
                }
            >
                <Card.Meta
                    title={
                        <h2 className="text-center">
                            {}
                        </h2>
                    }
                    description={<p className={"text-right"}>{content}</p>}
                />
            </Card>
        </div>
    )
}

export default FilmsContent