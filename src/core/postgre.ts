import { EventEmitter } from "node:events";
import { Client, ClientConfig } from "pg";
import { __config } from "./configs";

export class __postgres extends EventEmitter {
    private static _client: Client;
    private static _instance: __postgres;

    private constructor() {
        super();
        if (!__postgres._client) {
            __postgres._client = new Client(__config("postgre") as ClientConfig)
        }
    }
    public static Create(): __postgres {
        if (!__postgres._instance) {
            __postgres._instance = new __postgres();
        }
        return __postgres._instance;
    }
    public Connect(): Promise<void> {
        return __postgres._client.connect();
    }
}