import { Routers } from '@/router/symbol'

const testTwo: Array<Routers> = [
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
export default testTwo
