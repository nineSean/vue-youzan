import 'css/common.css'
import './goods_common.css'
import './goods_custom.css'
import './goods.css'
import './goods_theme.css'
import './goods_mars.css'
import './goods_sku.css'
import './goods_transition.css'
import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import mixin from 'js/mixin'
import qs from 'qs'
import swipe from 'components/Swipe.vue'

const {id} = qs.parse(location.search.substr(1))

const goods = new Vue({
  el: '#goods',
  components: {
    swipe
  },
  data: {
    goodsData: null,
    swipeLists: null,
    currentIndex: 0,
    dealLists: null,
    skuType: null,
    showSku: false,
    buyNum: 1,
    buttonGray: true,
  },
  created(){
    this.getGoodsData()
  },
  watch: {
    showSku(val, oldVal){
      document.body.style.overflow = val ? 'hidden' : 'auto'
      document.body.style.height = val ? '100%' : 'auto'
    }
  },
  methods: {
    fetch(api, param){
      if(param){
        return axios.post(api, param).then(res => {
          return res.data
        }).catch(error => {
          console.log(error)
        })
      }else{
        return axios.get(api).then(res => {
          return res.data
        }).catch(error => {
          console.log(error)
        })
      }
    },
    changeNum(num){
      if(this.buyNum <= 1 && num < 0) {
        return
      }
      this.buyNum += num
    },
    chooseSku(type){
      this.skuType = type
      this.showSku = true
    },
    getGoodsData(){
      this.fetch(url.goodsData, {id}).then( data => {
        this.goodsData = data.data
        this.getSwipeLists()
      })
    },
    getSwipeLists(){
      this.swipeLists = this.goodsData.images.map(item => {
        return {
          clickUrl: '#',
          image: item,
        }
      })
    },
    getDeal(){
      this.fetch(url.goodsDeal, {}).then( data => {
        this.dealLists = data.lists
      })
    },
    changeTab(index){
      this.currentIndex = index
      if(index == 1) this.getDeal()
    }
  }
})
