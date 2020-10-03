import HttpRequest from '@/lib/request'
export const httpBinInstance = new HttpRequest('http://httpbin.org')

//export const otherInstance = new HttpRequest("http://other-service")

export const jwtLogin = new HttpRequest('http://localhost:8102')

export const jwtServerInstance = new HttpRequest('http://localhost:8101')
