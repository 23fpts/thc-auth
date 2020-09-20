import axios from 'axios'

class HttpRequest {
  //构造函数
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }
  //针对axios实例的默认配置
  initConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //
      },
    }
    return config
  }
  //创建并返回axios实例，options参数为创建实例时传递的个性化参数
  request(options) {
    const instance = axios.create()
    //将默认配置与个性化配置整合。
    //如果二者发生冲突，个性化配置options，覆盖初始化默认配置initConfig()
    options = Object.assign(this.initConfig(), options)
    //在这里可以为axios实例instance设置拦截器
    return instance(options)
  }
}
export default HttpRequest
