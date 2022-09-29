const { Router } = require('express')
const routerUser = Router()


routerUser.get('/',(req, res) => {
    res.send('Get user')
})

module.exports = routerUser