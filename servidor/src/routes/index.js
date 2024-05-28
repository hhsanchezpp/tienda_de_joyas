const express = require('express');
const router = express.Router();
const reportRoute = require("../middlewares/index")
const { getJoyasController, filtrarJoyasController, getJoyaByIdController } = require("../controllers/index")

router.get('/joyas', reportRoute, getJoyasController);

router.get('/joyas/:id',reportRoute, getJoyaByIdController);

router.get('/joyas/filtros', reportRoute, filtrarJoyasController)

/* mensaje si no hay coincidencias en los router anteriores */
router.get("*", (req, res) => { res.status(404).send("La ruta solicitada no hay") })

module.exports = router;
