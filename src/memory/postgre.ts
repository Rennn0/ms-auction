import { __config } from "@core/configs";
import { IPostgresConfig } from "@core/interfaces";
import { UserModel } from "@models/user.model";
import { EventEmitter } from "node:events";
import { Sequelize } from "sequelize";

const config = __config("postgre") as IPostgresConfig;

export class __postgres extends EventEmitter {
    private static readonly _client = new Sequelize(config.database, config.user, config.password, {
        dialect: "postgres",
        host: config.host,
        port: config.port,
        logging: console.log,
    });

    private constructor() {
        super();
    }

    public static client() {
        return __postgres._client;
    }

    public static async syncDb(option: { force: true } | { alter: true } = { alter: true }): Promise<void> {
        await __postgres._client.sync(option);
    }
}


export const User = UserModel(__postgres.client());
