import dotenv from "dotenv";
import { IGoogleAuthConfig, IPostgresConfig, IRedisConfig, IServerConfig, ISessionConfig } from "./interfaces";
dotenv.config();

const PORT = process.env.PORT;
// const SESSION_SECRET = process.env.SESSION_SECRET as string;
const REDIS_HOST = process.env.REDIS_HOST as string;
const REDIS_PORT = process.env.REDIS_PORT as string;
const POSTGRES_HOST = process.env.POSTGRES_HOST as string;
const POSTGRES_PORT = process.env.POSTGRES_PORT as string;
const POSTGRES_USER = process.env.POSTGRES_USER as string;
const POSTGRES_PASS = process.env.POSTGRES_PASS as string;
const POSTGRES_DB = process.env.POSTGRES_DB as string;
// const CLIENT_ID = process.env.CLIENT_ID as string;
// const CLIENT_SECRET = process.env.CLIENT_SECRET as string;
// const REDIRECT_URI = process.env.REDIRECT_URI as string;

const __redis_config: IRedisConfig = {
    host: REDIS_HOST,
    port: parseInt(REDIS_PORT)
}

const __postgres_config: IPostgresConfig = {
    host: POSTGRES_HOST,
    port: parseInt(POSTGRES_PORT),
    user: POSTGRES_USER,
    password: POSTGRES_PASS,
    database: POSTGRES_DB
}

// const __session_config: ISessionConfig = {
//     secret: SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         secure: true,
//         sameSite: "lax"
//     }
// }

// const __google_auth_config: IGoogleAuthConfig = {
//     clientId: CLIENT_ID,
//     clientSecret: CLIENT_SECRET,
//     redirectUri: REDIRECT_URI
// }

const __server_config: IServerConfig = {
    port: parseInt(PORT ?? "3000")
}

const enum CONFIGS {
    redis = 1 << 0,
    postgre = 1 << 1,
    // session = 1 << 2,
    // google_auth = 1 << 3,
    server = 1 << 4
}

export function __config(option: keyof typeof CONFIGS) {
    switch (option) {
        // case "google_auth":
        // return __google_auth_config;
        case "postgre":
            return __postgres_config;
        case "redis":
            return __redis_config;
        case "server":
            return __server_config;
        // case "session":
        // return __session_config;
    }
}



