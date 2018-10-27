import 'css/common.css'
import './goods_common.css'
import './goods_custom.css'
import './goods.css'
import './goods_theme.css'
import './goods_mars.css'
import './goods_sku.css'
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
  },
  created(){
    this.getGoodsData()
  },
  watch: {
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
