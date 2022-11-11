const fs = require('fs')
const router = require('./index')

// const metaRouters = import.meta.globEager('./modules/*.ts')
// for (const metaRoutersKey in metaRouters) {
//   router.push(...metaRouters[metaRoutersKey].default)
// }

const Json = {
  pages: [],
  subPackages: [],
  globalStyle: {
    navigationBarTextStyle: 'black',
    navigationBarTitleText: 'uni-app',
    navigationBarBackgroundColor: '#F8F8F8',
    backgroundColor: '#F8F8F8'
  },
  easycom: {
    custom: {
      '^u-(.*)': 'vk-uview-ui/components/u-$1/u-$1.vue'
    }
  }
}
function createPages(children) {
  const pages = []
  children.forEach((item) => {
    const page = {
      path: `pages/${item.path}`,
      style: {
        navigationBarTitleText: item.meta?.title ?? ''
      }
    }
    pages.push(page)
  })
  return pages
}

function createSubPages(router) {
  const subPackages = {
    root: router.path,
    pages: []
  }
  router.children.forEach((item) => {
    const subPackage = {
      path: item.path,
      style: {
        navigationBarTitleText: item.meta?.title ?? ''
      }
    }
    subPackages.pages.push(subPackage)
  })
  return subPackages
}

router.forEach((item) => {
  if (item.children && item.children.length) {
    if (item.name === 'pages') {
      Json.pages = Json.pages.concat(createPages(item.children))
    }
    if (item.name === 'subPackages') {
      Json.subPackages = Json.subPackages.concat(createSubPages(item))
    }
  }
})

fs.rename('src/pages.json', 'src/pages.json.back', (err) => {
  if (err) {
    console.log(err)
  } else {
    fs.writeFile('src/pages.json', JSON.stringify(Json, null, '\t'), (err) => {
      err ? console.error(err) : console.log('pages.json文件更新成功!')
    })
  }
})
