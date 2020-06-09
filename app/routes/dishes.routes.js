const express  = require("express")
const router   = express.Router()
const passport = require("passport")

const {allDishes} = require("../controllers/dishes.controllers");



router.get('/getAuth', passport.authenticate('jwt', { session: false }), (req, res) => {
	res.status(200).send({ auth: true });
})

router.get('/allDishes',passport.authenticate('jwt', { session: false }), allDishes);
/*router.get('/findAllProjectsByCourse/:id',passport.authenticate('jwt', { session: false }), findAllProjectsByCourse);
router.post('/updateProject/:id',passport.authenticate('jwt', { session: false }), updateProject);
router.post('/updateKanbanProject/:id',passport.authenticate('jwt', { session: false }), updateKanbanProject);
*/
module.exports = router