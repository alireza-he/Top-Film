import React, {useState} from "react";
import {Col, Row} from "react-bootstrap";
import FilmCard from "../../components/films/film-card";
import {Pagination, Radio} from "antd";
import axios from "axios";
import categories from "../../util/categories.json"

const FilmsListPage = ({films}) => {
    // console.log(films)
    const [data, setData] = useState(films)

    const handleClickRadioBtn = async (text) => {
        await axios.get("/api/films/cats", {
            params: {type: "cats", text},
        }).then(res => {
            setData(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    console.log(data , "datadatadata")
    return (
        <div>
            <div className="rtl w-100 text-center p-3">
                <Radio.Group defaultValue="scifi" buttonStyle="solid">
                    {categories.cats.map((cat, index) => (
                        <Radio.Button
                            onClick={() => handleClickRadioBtn(cat.value)}
                            key={index}
                            value={cat.value}
                        >
                            {cat.text}
                        </Radio.Button>
                    ))}
                </Radio.Group>
                <p className="mt-3">
                    شما می توانید بر اساس ژانر مورد نظر خود، فیلم ها را دسته بندی کنید
                </p>
            </div>
            <Row className="rtl w-100">
                {data.map((film, index) => (
                    <Col key={index} xs={6} sm={4} md={3} lg={2}>
                        <FilmCard key={index} film={film}/>
                    </Col>
                ))
                }
            </Row>
            <div className="text-center">
                <Pagination total={50} pageSize={5}/>
            </div>
        </div>
    )
}

export const getServerSideProps = async (context) => {
    const getFilms = (await axios.get("/api/films/cats", {params: {type: "cats", text: "scifi"}})).data

    return {
        props: {
            films: getFilms
        }
    }
}

export default FilmsListPage