const url = {
  hotLists: '/index/hotLists',
  banner: '/index/banner'
}
const host = 'http://rap2api.taobao.org/app/mock/115043'
// const host = ''

for(let key in url){
  if(url.hasOwnProperty(key)){
    url[key] = host + url[key]
  }
}

export default url
