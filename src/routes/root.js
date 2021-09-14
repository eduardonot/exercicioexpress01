module.exports = router => {
	router.get('/', function (req, res) {
		res.send(req.session)
	})
}
