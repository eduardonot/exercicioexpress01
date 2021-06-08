const userService = require('./../repository/user-repository')

module.exports = {
	create: (req, res) => {
		userService.findPreviousSignUp(req.body)
			.then(data => {
				if(data){
					return res.status(400).send('Usuario já cadastrado!')
				}
				userService.signUp(req.body)
					.then(res.status(201).send('Usuário cadastrado!'))
					.catch(err => res.status(400).send(err))
			})
			.catch(err => res.status(400).send(err))
    },

    search: (req, res) => {
		userService.search(req.body)
			.select('name email')
			.then(data => res.json(data))
			.catch(err => res.status(400).send(err))
    }
}