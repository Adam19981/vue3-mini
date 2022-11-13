import { Router } from '@/router/symbol'

export const router: Array<Router> = [
  {
    name: 'subPackages',
    path: 'testSub',
    children: [
      {
        path: 'index/index',
        meta: {
          title: '分包'
        }
      }
    ]
  }
]
