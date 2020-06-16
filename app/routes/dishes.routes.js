const express  = require("express")
const router   = express.Router()
const passport = require("passport")

const {allDishes, createDish, allCategories} = require("../controllers/dishes.controllers");



router.get('/getAuth', passport.authenticate('jwt', { session: false }), (req, res) => {
	res.status(200).send({ auth: true });
})

router.get('/allDishes',passport.authenticate('jwt', { session: false }), allDishes);
router.post('/createDish'  ,passport.authenticate('jwt', { session: false }), createDish);
router.get('/allCategories'  ,passport.authenticate('jwt', { session: false }), allCategories);

module.exports = router