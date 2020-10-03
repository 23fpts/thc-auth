const LOCAL_JWT_KEY = 'jskdfls'
export const setJwtToken = (jwtToken) => {
  sessionStorage.setItem(LOCAL_JWT_KEY, jwtToken)
}
export const getJwtToken = () => {
  return sessionStorage.getItem(LOCAL_JWT_KEY)
}
export const getTokenUser = () => {
  // decodeURIComponent atob() 方法用于解码使用 base-64 编码的字符串
  // token在. 之后就是用户名 解码后获得username
  let userString = decodeURIComponent(window.atob(getJwtToken().split('.')[1]))
  // JSON.parse() 方法用于将一个 JSON 字符串转换为对象。然后取对象中sub的值返回
  // 	{
  //  alg: "HS512"
  // }.
  // {
  //  exp: 1601396569,
  //  sub: "admin",
  //  created: 1601392969999
  // }.
  // [signature]
  return JSON.parse(userString).sub
}
