const RedisClient = require("redis");
const RedisClouster = require("redis-clustr")
const HOST_REDIS = process.env.HOST_REDIS;
const PORT_REDIS = process.env.PORT_REDIS;
const redis = new RedisClouster({
    servers: [{
        host: HOST_REDIS,
        port: PORT_REDIS
    }],
    createClient: function(port, host) {
        return RedisClient.createClient(port, host)
    }

});

redis.on("error", function(error) {
    console.error(error);
});
redis.subscribe('my-channel', function(err) {
    redis.publish('my-channel', 'have a lovely day!');
});

let verifyUser = async(req, res, next) => {
    let user = req.get('user');
    let _user
    try {
        _user = await redis.get(user)
        if (!_user) {
            return res.estatus(400).json({
                ok: false,
                message: 'debe loguearse para continuar'
            })
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'erro verificando usuario',
            error
        })
    }

}
module.exports = {
    verifyUser
};