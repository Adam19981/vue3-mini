const testRouter = [
  {
    name: 'pages',
    path: 'pages',
    children: [
      {
        path: 'index/index',
        meta: {
          title: '数据可视化'
        }
      },
      {
        path: 'pinia/index',
        meta: {
          title: '状态管理工具（pinia）'
        }
      },
      {
        path: 'axios/index',
        meta: {
          title: 'Axios（网络请求示例）'
        }
      },
      {
        path: 'uview/index',
        meta: {
          title: 'uView 示例组件'
        }
      }
    ]
  }
]

module.exports = testRouter
