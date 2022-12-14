export interface Router {
  path: string
  meta: Record<string, any>
}

export interface Routers {
  name: 'pages' | 'subPackages'
  path: string
  children?: Array<Router>
}

export interface Page {
  path: string
  style?: Record<string, any>
}
export interface SubPackage {
  root: string
  pages?: Array<Page>
}

export interface PageJson {
  pages: Page[]
  subPackages: SubPackage[]
  globalStyle: Record<string, any>
  easycom: Record<string, any>
}
