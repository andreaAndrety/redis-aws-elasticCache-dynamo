const express = require("express");
const dynamoose = require("dynamoose");
const uuid = require("uuid");
const IS_OFFLINE = process.env.NODE_ENV !== "production";
const HOST_REDIS = process.env.HOST_REDIS;
const PORT_REDIS = process.env.PORT_REDIS;
const redis = require("redis");
const client = redis.createClient({
    host: HOST_REDIS,
    port: PORT_REDIS

});

client.on("error", function(error) {
    console.error(error);
});
const router = express.Router();
// create roulette
router.post("/user", async(req, res) => {
    const user = req.body.user;
    let _user
    try {
        _user = await client.set(user, "OK")
        res.json({
            ok: true,
            mesagge: "se logueo correctamente",
            _user
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            mesagge: 'error registrando usuario'
        })
    }

});
module.exports = router;