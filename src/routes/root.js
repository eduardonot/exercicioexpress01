const getSession = require(`./../middlewares/getSession`)

module.exports = router => {
	router.get('/', getSession.check, function (req, res) {
		res.send(req.session)
	})
}
