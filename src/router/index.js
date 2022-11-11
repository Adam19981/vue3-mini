const moduleRouter = require('./modules/testRouter')
const moduleRouterTwo = require('./modules/testTwo')

const router = [...moduleRouter, ...moduleRouterTwo]
module.exports = router
