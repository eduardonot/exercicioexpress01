module.exports = {
    name: (field) => {
        const nameFormat = /[^\sa-zA-Z|á|à|é|ã|ê|î|ô|ê|ç|ã|ô|ñ|õ|ó|í|ú|ì|]/igu
        if (field.match(nameFormat)) {
            return false
        }
        return true
    },
    email: (field) => {
        const mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if (!field || !field.match(mailFormat)) {
            return false
        }
        return true
    },
    pass: (field) => {
        const passFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
        if (!field || !field.match(passFormat)) {
            return false
        }
        return true
    },
    passMatch: (pass1, pass2) => {
        if (pass1 !== pass2) {
            return false
        }
        return true
    }

}
