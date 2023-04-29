import { router as userRouter } from '../subPackages/user/router'
import { router as homeRouter } from '../pages/router'

const router = [...userRouter, ...homeRouter]

export default router
