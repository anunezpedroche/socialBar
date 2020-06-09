const express  = require("express")
const router   = express.Router()
const passport = require("passport")

const {allCardsEstablishmentsId} = require("../controllers/cards.controllers");



router.get('/getAuth', passport.authenticate('jwt', { session: false }), (req, res) => {
	res.status(200).send({ auth: true });
})

router.get('/allCardsEstablishmentsId/:id',passport.authenticate('jwt', { session: false }), allCardsEstablishmentsId);
/*router.get('/findAllProjectsByCourse/:id',passport.authenticate('jwt', { session: false }), findAllProjectsByCourse);
router.post('/updateProject/:id',passport.authenticate('jwt', { session: false }), updateProject);
router.post('/updateKanbanProject/:id',passport.authenticate('jwt', { session: false }), updateKanbanProject);
*/
module.exports = router