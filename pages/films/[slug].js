import React from "react";
import FilmsContent from "../../components/film/film-content";
import FilmsDetails from "../../components/film/film-details";
import FilmsComment from "../../components/film/film-comment";
import axios from "axios";
import Head from "next/head";

const FilmsPage = ({film}) => {
    console.log(film, "slug film")
    return (
        <React.Fragment>
            <Head>
                <title>
                    تاپ فیلم || {film.name}
                </title>
            </Head>
            <div className="rtl p-5">
                <FilmsContent film={film}/>

                <FilmsDetails/>

                <FilmsComment comments={film.comments} filmId={film._id}/>
            </div>
        </React.Fragment>
    )
}

export const getServerSideProps = async (context) => {
    const filmID = context.params.slug;
    const film = (await axios.get("/api/film", {params: {filmID}})).data;

    return {
        props: {
            film
        }
    }
}

export default FilmsPage