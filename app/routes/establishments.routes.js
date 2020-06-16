const express  = require("express")
const router   = express.Router()
const passport = require("passport")

const {allEstablishments, createEstablishment} = require("../controllers/establishments.controllers");



router.get('/getAuth', passport.authenticate('jwt', { session: false }), (req, res) => {
	res.status(200).send({ auth: true });
})

router.get('/allEstablishments',passport.authenticate('jwt', { session: false }), allEstablishments);
router.post('/createEstablishment',passport.authenticate('jwt', { session: false }) ,createEstablishment)

module.exports = router