import {putUser} from "../../../../server/controller/Users"

export default async function handler(req, res) {
    const values = req.body;

    const user = await putUser(values);

    res.status(200).json(user)
}