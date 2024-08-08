import express from "express";
import cors from "cors";
import { __config } from "@core/configs";
import { authRouter } from "@routers/authRouter";
import { __redis } from "@memory/redis";
import { __postgres, User } from "@memory/postgre";
import { IServerConfig } from "@core/interfaces";

const app = express();

const { port } = __config("server") as IServerConfig;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

app.use("/", authRouter);

app.listen(port, () => {
    console.log(`Listening on ${port}`)
})

__redis.Create().set("FOO", "BAR", "EX", 60)
    .then(() => __redis.Create().get("FOO"))
    .then(data => console.log(`Connected to redis FOO-${data}`))
    .catch(e => console.error(e));

__postgres.syncDb().then(() => console.log("synced db")).catch(e => console.error(e));