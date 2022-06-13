import React from "react";
import styles from "./film-card.module.css"
import Link from "next/link";
import {Card} from "react-bootstrap";

const FilmCard = ({film}) => {
    return (
        <div className="text-center">
            <Link href={`/films/${film._id}`}>
                <div className={styles.card_font_hover}>
                    <Card className={styles.card}>
                        <Card.Img
                            className={styles.img_shadow}
                            src={`data:${film.poster[0].media.data.contentType};base64,${film.poster[0].media.data}`}
                            alt={film.poster[0].alt}
                        />
                        <p>{film.name}</p>
                    </Card>
                </div>
            </Link>
        </div>
    )
}

export default FilmCard