import {withIronSessionApiRoute} from "iron-session/next";

async function handler(req, res, session) {
    const {user} = req.body;
    await res.send({token: req.session.user, user});
}

export default withIronSessionApiRoute(handler, {
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