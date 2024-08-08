import express, { Request, Response, Router } from "express";
import axios from "axios";
import { __config } from "@core/configs";

export const authRouter: Router = express.Router();
/**
 * googleti shesvlisas fronti credentials momcems, tokens vamowmeb
 * iqidan mail,saxels,fotos amovigeb da vubruneb, shemdeg
 * /auth/register routze unda daabrunos shevsebuli info
 * +piradi nomeri, momavalshi qveyana an msgavsis damatebc mosula
 */
authRouter.get("/auth/google", async (req: Request, res: Response) => {
    const { access_token } = req.query;
    try {
        const { data: profile } = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${access_token}`);

        const email: string | undefined = profile["email"];
        const name: string | undefined = profile["name"];
        const picture: string | undefined = profile["picture"];

        // bazashic chasaweria es tipi da mietitos ro googleti shemovida
        // shemdeg paroli ar moitxoveba amaze

        res.json({ email, name, picture });

    } catch (err) {
        res.json(err);
    }
});

/**
 * bazashi sruli chanaweri sheinaxeba, maili
 */
authRouter.post("/auth/register", async (req: Request, res: Response) => {
    // @TODO tokenis dabruneba

})

// authRouter.get("/auth/google/callback", async (req: Request, res: Response) => {
//     const code = req.query.code as string;

//     try {
//         const { data } = await axios.post('https://oauth2.googleapis.com/token', {
//             client_id: google_config.clientId,
//             client_secret: google_config.clientSecret,
//             code,
//             redirect_uri: google_config.redirectUri,
//             grant_type: "authorization_code"
//         });

//         const { access_token, id_token } = data;

//         const { data: profile } = await axios.get("https://www.googleapis.com/oauth2/v1/userinfo", {
//             headers: { Authorization: `Bearer ${access_token}` }
//         });

//         const profileCookie: IProfile = {
//             ...profile,
//             access_level: ACCESS_LEVEL.Guest,
//         }

//         res.cookie("profile", JSON.stringify(profileCookie), {
//             httpOnly: true,
//             secure: true,
//             sameSite: "lax"
//         })

//         res.redirect("/");
//     } catch (error: any) {
//         console.error('Error:', error.response?.data?.error || error.message);
//         res.redirect("/");
//     }
// })

// authRouter.get('/logout', (req: Request, res: Response) => {
//     res.clearCookie("profile", { path: "/", secure: false, sameSite: 'lax' });
//     req.session.destroy((err) => {
//         if (err) {
//             console.error(err);
//             res.status(500).json({ message: "cannot logout" })
//         } else {
//             res.redirect('/');
//         }
//     });
// });

// authRouter.get("/", async (req: Request, res: Response) => {
//     const profile: string | null = req.cookies["profile"];

//     if (profile) {
//         res.json(JSON.parse(profile));
//     } else {
//         res.json({ message: "no cookies" })
//     }
// });