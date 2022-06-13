const {createComment} = require("../../../server/controller/Film")

export default async function handler(req, res) {
    console.log(req.body , "req.query and req.body comment")
    const comment = await createComment(req.body)

    res.status(200).json(comment)
}