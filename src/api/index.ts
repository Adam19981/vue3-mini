interface Request {
  url: string
  data?: string | Record<string, any>
  header?: any
  timeout?: number
  method?: 'GET' | 'POST'
}
interface Option {
  url: string
  data?: string | Record<string, any>
  method?: 'GET' | 'POST'
}

class RequestManager {
  baseURL: string

  constructor() {
    // #ifdef H5
    this.baseURL =
      'https://service-rbji0bev-1256505457.cd.apigw.tencentcs.com/release'

    // #endif
    // #ifdef MP-WEIXIN
    this.baseURL = this.getWXHost()
    // #endif
  }

  public request(option: Option): Promise<any> {
    return new Promise((resolve, reject) => {
      const config = this.interceptorsRequest(option)
      uni.request({
        ...config,
        success: (result) => {
          const err = this.interceptorsResponse(result)
          if (err) {
            uni.showToast({
              title: err.message,
              icon: 'error'
            })
            return
          }
          resolve(result.data)
        },

        fail: (err) => {
          uni.showToast({
            title: err.errMsg,
            icon: 'error'
          })
          reject(err)
        }
      })
    })
  }

  public interceptorsRequest(option: Option): Request {
    const options: Request = {
      url: this.baseURL + option.url,
      data: option.data,
      method: option.method,
      timeout: 6000,
      header: {}
    }
    const token = uni.getStorageSync('token')
    token && (options.header.token = token)
    return options
  }

  public interceptorsResponse(
    result: any
  ): { code: number; message: string } | null {
    const { code, message } = result
    if (code) {
      return {
        code,
        message
      }
    }
    return null
  }

  public getWXHost(): string {
    // //envVersion: 'develop',    //开发版
    // //envVersion: 'trial',          //体验版
    // //envVersion: 'release',     //正式版
    const { envVersion } = uni.getAccountInfoSync().miniProgram
    switch (envVersion) {
      case 'develop':
      case 'trial':
        return 'https://xxxx.com2222'
      case 'release':
        return '1'
    }
  }
}
export const requestInstance = new RequestManager()
export { default as userApi } from './modules/user'
