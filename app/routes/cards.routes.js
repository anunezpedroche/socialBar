const express  = require("express")
const router   = express.Router()
const passport = require("passport")

const {allCardsEstablishmentsId, dishesToCard, createCard, cardFromId} = require("../controllers/cards.controllers");



router.get('/getAuth', passport.authenticate('jwt', { session: false }), (req, res) => {
	res.status(200).send({ auth: true });
})

router.get('/allCardsEstablishmentsId/:id',passport.authenticate('jwt', { session: false }), allCardsEstablishmentsId);
router.post('/dishesToCard',passport.authenticate('jwt', { session: false }), dishesToCard);
router.post('/createCard',passport.authenticate('jwt', { session: false }), createCard);
router.get('/cardsFromId/:id', cardFromId);

module.exports = router