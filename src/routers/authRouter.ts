import express, { Request, Response, Router } from "express";
import axios from "axios";
import { redis_cache } from "../core/redis";
import { CACHE_EVENTS } from "../core/events_enum";
import { __config } from "../core/configs";
import { IGoogleAuthConfig, IProfile } from "../core/interfaces";
import { ACCESS_LEVEL } from "../core/access_levels";
import { CLIENT_TYPE } from "../core/client_types";

export const authRouter: Router = express.Router();

const google_config = __config("google_auth") as IGoogleAuthConfig;

authRouter.get("/auth/google", (req: Request, res: Response) => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${google_config.clientId}&redirect_uri=${google_config.redirectUri}&response_type=code&scope=profile email`;
    res.redirect(url);
});

authRouter.get("/auth/google/callback", async (req: Request, res: Response) => {
    const code = req.query.code as string;

    try {
        const { data } = await axios.post('https://oauth2.googleapis.com/token', {
            client_id: google_config.clientId,
            client_secret: google_config.clientSecret,
            code,
            redirect_uri: google_config.redirectUri,
            grant_type: "authorization_code"
        });

        const { access_token, id_token } = data;

        const { data: profile } = await axios.get("https://www.googleapis.com/oauth2/v1/userinfo", {
            headers: { Authorization: `Bearer ${access_token}` }
        });

        const profileCookie: IProfile = {
            ...profile,
            access_level: ACCESS_LEVEL.Guest,
        }

        res.cookie("profile", JSON.stringify(profileCookie), {
            httpOnly: true,
            secure: true,
            sameSite: "lax"
        })

        res.redirect("/");
    } catch (error: any) {
        console.error('Error:', error.response?.data?.error || error.message);
        res.redirect("/");
    }
})

authRouter.get('/logout', (req: Request, res: Response) => {
    res.clearCookie("profile", { path: "/", secure: false, sameSite: 'lax' });
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "cannot logout" })
        } else {
            res.redirect('/');
        }
    });
});

authRouter.get("/", async (req: Request, res: Response) => {
    const profile: string | null = req.cookies["profile"];

    if (profile) {
        res.json(JSON.parse(profile));
    } else {
        res.json({ message: "no cookies" })
    }
});