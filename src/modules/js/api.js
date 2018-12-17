const url = {
  hotLists: '/index/hotLists',
  banner: '/index/banner',
  topLists: '/category/topLists',
  subData: '/category/subLists',
  rankData: '/category/rank',
  searchLists: '/search/lists',
  goodsData: '/goods/details',
  goodsDeal: '/goods/deal',
  addCart: '/cart/add'
}
// const host = 'http://rap2api.taobao.org/app/mock/115043'
const host = 'https://easy-mock.com/mock/5bd1bce75e38a677f659a931'

for(let key in url){
  if(url.hasOwnProperty(key)){
    url[key] = host + url[key]
  }
}

export default url
