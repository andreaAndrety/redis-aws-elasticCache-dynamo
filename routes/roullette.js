const express = require("express");
const dynamoose = require("dynamoose");
const Roulette = require("../models/modelRoulette");
const uuid = require("uuid");
let { verifyUser } = require('../middlewares/autenticacion');
const IS_OFFLINE = process.env.NODE_ENV !== "production";


const router = express.Router();
// create roulette
router.post("/roulette", verifyUser, async(req, res) => {
    const user = req.user;
    const name = req.body.name;
    const roulette = new Roulette({
        rouletteId: uuid.v4(),
        name: name,
        rouletteDate: new Date().toISOString(),
    });
    let _roulette;
    try {
        _roulette = await roulette.save();
        return res.status(200).json({
            ok: true,
            user: user,
            _roulette
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "ocurrio un error al realizar la operacion",
            error
        });
    }
});
// get list roulette
router.get("/roulette", verifyUser, async(req, res) => {
    let _roulette;
    try {
        _roulette = await Roulette.scan().exec;
        return res.status(200).json({
            ok: true,
            _roulette,
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "ocurrio un error al realizar la operacion",
            error
        });
    }
});
// open roulette
router.put("/openroulette/:rouletteId", verifyUser, async(req, res) => {
    const rouletteId = req.params.rouletteId
    let _roulette
    try {
        _roulette = await Roulette.update({
            rouletteId: rouletteId,
            isOpen: true
        });
        return res.status(200).json({
            ok: true,
            message: 'la Ruleta quedo abierta .'
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