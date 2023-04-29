import { Router } from '@/router/symbol'

export const router: Array<Router> = [
  {
    mode: 'subPackages',
    path: 'user/views',
    children: [
      {
        path: 'index',
        meta: {
          title: '用户'
        }
      }
    ]
  }
]
