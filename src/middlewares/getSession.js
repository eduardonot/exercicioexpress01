module.exports = {
	check (req, res, next) {
		res.send(req.session)
	}
}
