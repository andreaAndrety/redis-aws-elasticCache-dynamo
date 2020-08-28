const express = require("express");
const dynamoose = require("dynamoose");
const Bet = require("../models/modelBet");
const uuid = require("uuid");
let { verifyUser } = require('../middlewares/autenticacion');
const IS_OFFLINE = process.env.NODE_ENV !== "production";

const router = express.Router();

// create Bet
router.post("/bet/:userId", verifyUser, async(req, res) => {
    const body = req.body;
    const userId = req.userId
    if (body.type === 'color' && (body.bet != 'red' | body.bet != 'black')) {
        return res.status(500).json({
            ok: false,
            message: "las apuestas de color solo tiene 2 opciones :red,black",
        });
    } else if (body.type === 'number' && !(body.bet >= 0 && body.bet <= 36)) {
        return res.status(500).json({
            ok: false,
            message: "las apuestas de numero solo puedes ser del 0 al 36",
        });
    }
    const bet = new Bet({
        betId: uuid.v4(),
        userId: userId,
        type: body.type,
        bet: body.bet,
        betValor: body.betValor,
        Betdate: new Date().toISOString(),
    });
    let _bet;
    try {
        _bet = await bet.save();
        return res.status(200).json({
            ok: true,
            _bet,
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "ocurrio un error al realizar la operacion",
            error
        });
    }
});
// get list bet by rouletteId
router.get("/bet/:rouletteId", verifyUser, async(req, res) => {
    const rouletteId = req.params.rouletteId
    let _bet;
    try {
        _bet = await Bet.query("rouletteId").eq(rouletteId).exec;
        return res.status(200).json({
            ok: true,
            _bet
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "ocurrio un error al realizar la operacion",
            error
        });
    }
});


module.exports = router;