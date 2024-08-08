import express from "express";
import cookieParser from "cookie-parser";
import session, { SessionOptions } from "express-session";
import { authRouter } from "./routers/authRouter";
import { __config } from "./core/configs";
import { IServerConfig } from "./core/interfaces";
import { __postgres } from "./core/postgre";
import { __redis } from "./core/redis";

const app = express();
const { port } = __config("server") as IServerConfig;

app.use(cookieParser());
app.use(session(__config("session") as SessionOptions))

app.use("/", authRouter);

app.listen(port, () => {
    console.log(`Listening on ${port}`)
})

__redis.Create().set("FOO", "BAR", "EX", 60)
    .then(() => __redis.Create().get("FOO"))
    .then(data => console.log(`Connected to redis FOO-${data}`))
    .catch(e => console.error(e));

__postgres.Create().Connect()
    .then(() => console.log("Connected to postgres"))
    .catch(e => console.error(e));
