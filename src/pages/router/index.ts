import { Router } from '@/router/symbol'

export const router: Array<Router> = [
  {
    mode: 'pages',
    path: 'index',
    children: [
      {
        path: 'index',
        meta: {
          title: '首页'
        }
      }
    ]
  }
]
