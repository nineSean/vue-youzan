import './cart_base.css'
import './cart_trade.css'
import './cart.css'
import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import mixin from 'js/mixin.js'

new Vue({
  el: '.container',
  data: {
    lists: null,
    total: 0,
    editingShop: null,
    editingShopIndex: -1,
  },
  created(){
    this.getLists()
  },
  methods: {
    getLists(){
      axios.get(url.cartLists).then( res => {
        let lists = res.data.cartLists
        lists.forEach(shop => {
          shop.checked = false
          shop.editing = false
          shop.editingMsg = '编辑'
          shop.goodsList.forEach(good => {
            good.checked = false
          })
        })
        this.lists = lists
      })
    },
    selectShop(shopItem){
      shopItem.checked = !shopItem.checked
      shopItem.goodsList.forEach(good => {
        good.checked = shopItem.checked
      })
    },
    selectGood(goodItem, shopItem) {
      goodItem.checked = !goodItem.checked
      shopItem.checked = shopItem.goodsList.every(good => good.checked)
    },
    selectAll() {
      this.allSelected = !this.allSelected
    },
    edit(shopItem, shopIndex) {
      shopItem.editing = !shopItem.editing
      shopItem.editingMsg = shopItem.editing ? '完成' : '编辑'
      this.lists.forEach((shop, i) => {
        if(shopIndex !== i){
          shop.editingMsg = shopItem.editing ? '' : '编辑'
        }
      })
      this.editingShop = shopItem.editing ? shopItem : null
      this.editingShopIndex = shopItem.editing ? shopIndex : -1
    }
  },
  computed: {
    allSelected: {
      get() {
        if(this.lists && this.lists.length){
          return this.lists.every(shop => shop.checked)
        }
        return false
      },
      set(newVal) {
        this.lists.forEach(shop => {
          shop.checked = newVal
          shop.goodsList.forEach(good => {
            good.checked = newVal
          })
        })
      }
    },
    listSelected() {
      if(this.lists && this.lists.length){
        let arr = []
        let total = 0
        this.lists.forEach(shop => {
          shop.goodsList.forEach(good => {
            if(good.checked){
              arr.push(good)
              total += good.price * good.number
            }
          })
        })
        this.total = total
        return arr
      }
      return []
    }
  },
  mixins: [mixin],
})


