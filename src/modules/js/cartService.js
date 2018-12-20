import fetch from 'js/fetch.js'
import url from 'js/api.js'

export default class Cart {
  static add(id){
    return fetch(url.cartPlus, {
      id,
      number: 1
    })
  }
  static reduce(id){
    return fetch(url.cartReduce, {
      id,
      number: 1
    })
  }
}
