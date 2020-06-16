const express  = require("express")
const router   = express.Router()
const passport = require("passport")

const {allTables, createTable, cardFromTable} = require("../controllers/tables.controllers");



router.get('/getAuth', passport.authenticate('jwt', { session: false }), (req, res) => {
	res.status(200).send({ auth: true });
})

router.get('/allTables', passport.authenticate('jwt', { session: false }), allTables);
router.post('/createTable', passport.authenticate('jwt', { session: false }), createTable);
router.get('/cardFromTable/:idTable/:idCard', cardFromTable);

module.exports = router