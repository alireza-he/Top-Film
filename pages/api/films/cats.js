const {searchFilms} = require("../../../server/controller/Film")

export default async function handler(req, res) {
    if (req.method === "GET") {
        const findFilms = await searchFilms(req.query)
        console.log(findFilms, "is findFilms")
        res.status(200).json(findFilms)
    }
}