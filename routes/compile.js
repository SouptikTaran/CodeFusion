const router = require("express").Router();
const compilerController = require("../controllers/compiler")

router.get('/compiler' , compilerController.compilerGet)
router.post('/compiler' , compilerController.compilerCode)


module.exports = router