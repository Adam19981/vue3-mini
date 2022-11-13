import * as fs from 'fs'
import {
  Router,
  RouterChildren,
  Page,
  SubPackage,
  PageJson
} from '@/router/symbol'
import router from './index'

const pageJson: PageJson = {
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
function createPages(children: RouterChildren[]): Page[] {
  const pages: Page[] = []
  children.forEach((item: RouterChildren) => {
    const page: Page = {
      path: `pages/${item.path}`,
      style: {
        navigationBarTitleText: item.meta?.title ?? ''
      }
    }
    pages.push(page)
  })
  return pages
}

function createSubPages(router: Router): SubPackage {
  const subPackages: SubPackage = {
    root: router.path,
    pages: []
  }
  router.children?.forEach((item: RouterChildren) => {
    const subPackage: Page = {
      path: item.path,
      style: {
        navigationBarTitleText: item.meta?.title ?? ''
      }
    }
    subPackages.pages?.push(subPackage)
  })
  return subPackages
}

router.forEach((item: Router) => {
  if (item.children && item.children.length) {
    if (item.name === 'pages') {
      pageJson.pages = pageJson.pages.concat(createPages(item.children))
    } else {
      pageJson.subPackages.push(createSubPages(item))
    }
  }
})

fs.rename(
  'src/pages.json',
  'src/pages.json.back',
  (err: NodeJS.ErrnoException | null) => {
    if (err) {
      console.log(err)
    } else {
      fs.writeFile(
        'src/pages.json',
        JSON.stringify(pageJson, null, '\t'),
        (err: NodeJS.ErrnoException | null) => {
          err ? console.error(err) : console.log('pages.json文件更新成功!')
        }
      )
    }
  }
)
