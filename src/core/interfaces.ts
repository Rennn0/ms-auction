import { ACCESS_LEVEL } from "./access_levels"
import { CLIENT_TYPE } from "./client_types"

export interface IRedisConfig {
    host: string,
    port: number
}

export interface IPostgresConfig {
    host: string,
    port: number,
    user: string,
    password: string,
    database: string
}

export interface ISessionConfig {
    secret: string,
    resave: boolean,
    saveUninitialized: boolean,
    cookie: {
        secure: boolean,
        sameSite: "lax"
    }
}

export interface IGoogleAuthConfig {
    clientId: string,
    clientSecret: string,
    redirectUri: string
}

export interface IServerConfig {
    port: number
}

export interface IProfile {
    id: string,
    email: string,
    verified_email: boolean,
    name: string,
    given_name: string,
    picture: string
    access_level?: ACCESS_LEVEL,
    client_type?: CLIENT_TYPE
}