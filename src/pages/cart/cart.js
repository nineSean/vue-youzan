import './cart_base.css'
import './cart_trade.css'
import './cart.css'
import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import mixin from 'js/mixin.js'
import velocity from 'velocity-animate'
import Cart from 'js/cartService.js'

new Vue({
  el: '.container',
  data: {
    lists: null,
    total: 0,
    editingShop: null,
    editingShopIndex: -1,
    removePopup: false,
    removeData: null,
    removeMsg: '',
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
          shop.removeChecked = false
          shop.editing = false
          shop.editingMsg = '编辑'
          shop.goodsList.forEach(good => {
            good.checked = false
            good.removeChecked =false
          })
        })
        this.lists = lists
      })
    },
    selectShop(shopItem, shopIndex){
      if (this.editingShop) {
        if (this.editingShopIndex == shopIndex){
          let attr = 'removeChecked'
          shopItem[attr] = !shopItem[attr]
          shopItem.goodsList.forEach(good => {
            good[attr] = shopItem[attr]
          })
        }else{
          return
        }
      }
      let attr = 'checked'
      shopItem[attr] = !shopItem[attr]
      shopItem.goodsList.forEach(good => {
        good[attr] = shopItem[attr]
      })
    },
    selectGood(goodItem, shopItem, shopIndex) {
      if(this.editingShop){
        if(this.editingShopIndex == shopIndex){
          let attr = 'removeChecked'
          goodItem[attr]= !goodItem[attr]
          shopItem[attr]= shopItem.goodsList.every(good => good[attr])
        }else{
          return
        }
      }
      let attr = 'checked'
      goodItem[attr]= !goodItem[attr]
      shopItem[attr]= shopItem.goodsList.every(good => good[attr])
    },
    selectAll() {
      let attr = this.editingShop ? 'removeModeAllSelected' : 'allSelected'
      this[attr] = !this[attr]
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
    },
    add(item) {
      // axios.post(url.cartPlus, {
      //   id: item.id,
      //   number: 1
      // }).then(res => {
      //   item.number++
      // })
      Cart.add(item.id).then(res => {
        item.number++
      })
    },
    reduce(item) {
      if(item.number == 1) return
      Cart.reduce(item.id).then(res => {
        item.number--
      })
      // axios.post(url.cartReduce, {
      //   id: item.id,
      //   number: 1
      // }).then(res => {
      //   item.number--
      // })
    },
    moreThanOne(val){
      return typeof val === 'number' && val >= 1 ? parseInt(val) : 1
    },
    remove(shopItem, shopIndex, goodItem, goodIndex) {
      this.removePopup = true
      this.removeData = {shopItem, shopIndex, goodItem, goodIndex}
      this.removeMsg = '确定要删除该商品吗？'
    },
    removeList() {
      this.removePopup = true
      this.removeMsg = `确定将所选 ${this.listRemoved.length} 个商品删除？`
    },
    removeConfirm(){
      if(this.removeMsg == '确定要删除该商品吗？'){
          let {shopItem, shopIndex, goodItem, goodIndex} = this.removeData
          axios.post(url.cartRemove, {
          id: goodItem.id
        }).then(res => {
          this.removePopup = false
          shopItem.goodsList.splice(goodIndex, 1)
          if(!shopItem.goodsList.length){
            this.removeShop(shopIndex)
          }
        })
      }else{
        let ids = []
        this.listRemoved.forEach(good => {
          ids.push(good.id)
        })
        axios.post(url.cartMremove, {
          ids
        }).then(res => {
          let arr = []
          this.editingShop.goodsList.forEach(good => {
            let index = this.listRemoved.findIndex(item => {
              return item.id == good.id
            })
            if(index == -1){
              arr.push(good)
            }
          })
          if(arr.length){
            this.editingShop.goodsList = arr
          }else{
            this.removeShop(this.editingShopIndex)
          }
          this.removePopup = false
        })
      }
    },
    removeShop(i) {
      this.lists.splice(i, 1)
      this.editingShop = null
      this.editingShopIndex = -1
      this.lists.forEach(shop => {
        shop.editingMsg = '编辑'
      })
    },
    start(e, shop) {
      shop.startX = e.changedTouches[0].clientX
    },
    end(e, shop, shopIndex, goodIndex) {
      let endX = e.changedTouches[0].clientX
      let left = '0'
      if(shop.startX - endX > 100){
        left = '-60px'

      }
      if(endX - shop.startX > 100){
        left = '0px'
      }
      velocity(this.$refs[`good-${shopIndex}-${goodIndex}`], {
        left
      })
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
    removeModeAllSelected: {
      get() {
        if(this.editingShop){
          return this.editingShop.removeChecked
        }
      },
      set(newVal) {
        if(this.editingShop){
            this.editingShop.removeChecked = newVal
            this.editingShop.goodsList.forEach(good => {
            good.removeChecked = newVal
          })
        }
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
    },
    listRemoved() {
      let arr = []
      if(this.editingShop){
        this.editingShop.goodsList.forEach(good => {
          if(good.removeChecked){
            arr.push(good)
          }
        })
        return arr
      }
      return arr
    }
  },
  mixins: [mixin],
})


