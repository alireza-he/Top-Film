const {userAuthenticating} = require("../../../server/controller/Users")
import {withIronSessionApiRoute} from "iron-session/next";

async function handler(req, res) {
    const {username, password} = req.body;
    const data = await userAuthenticating({username, password});

    if (data.status === "SUCCESS") {
        // res.setHeader(
        //     "Set-Cookie",
        //     cookie.serialize("token", data.token, {
        //         httpOnly: true,
        //         secure: process.env.NODE_ENV !== "development",
        //         maxAge: 60 * 60 * 24 * 7,
        //         sameSite: "strict",
        //         path: "/"
        //     })
        // )
        req.session.user = (data.token);
        await req.session.save();

        res.status(200).json(data)
    } else if (data.status === "ERROR") {
        res.status(400).json(data)
    }
}

export default withIronSessionApiRoute(handler,
    {
        cookieName: "token",
        password: "UtHmX6UJnwff1tgiAuPC7xy2Bj0375ey",
        cookieOptions: {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 60 * 24 * 7,
            sameSite: "strict",
            path: "/"
        },
    });