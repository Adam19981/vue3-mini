import { router as RouterOne } from './modules/testRouter'
import { router as moduleRouterTwo } from './modules/testTwo'

const router = [...RouterOne, ...moduleRouterTwo]

export default router
