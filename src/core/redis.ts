import EventEmitter from "node:events";
import Redis, { RedisOptions } from "ioredis"
import { CACHE_EVENTS } from "./events_enum";
import { __config } from "./configs";

export class __redis extends EventEmitter {
    private static _instance: __redis;
    private static _client: Redis;

    private constructor() {
        super();
        if (!__redis._client) {
            __redis._client = new Redis(__config("redis") as RedisOptions);
        }
    }

    public static Create(): Redis {
        if (!__redis._instance) {
            __redis._instance = new __redis();
        }
        return __redis._client;
    }

    public async get(key: string): Promise<string | null> {
        let value: string | null = null;
        value = await __redis._client.get(key);
        return value;
    }
}

export const redis_cache = new Redis();

redis_cache.on(CACHE_EVENTS.Save, (key: string, value: string, duration_sec?: number) => {
    if (duration_sec != null) {
        __redis.Create().set(key, value, "EX", duration_sec);
    } else {
        __redis.Create().set(key, value);
    }
})