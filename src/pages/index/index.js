import 'css/common.css'
import './index.css'
import Vue from 'vue';
import axios from 'axios'
import url from 'js/api.js'
import { InfiniteScroll } from 'mint-ui';
import Swipe from 'components/Swipe.vue'
import mixin from 'js/mixin.js'

Vue.use(InfiniteScroll);

const app = new Vue({
  el: '#app',
  mixins: [mixin],
  data: {
    lists: null,
    pageNum: 1,
    pageSize: 6,
    loading: false,
    allLoaded: false,
    bannerLists: null,
  },
  components:{
    Swipe,
  },
  created(){
    this.getLists()
    this.getBanner()
  },
  methods: {
    getLists(){
      if(this.allLoaded) return
      this.loading = true
      axios.post(url.hotLists, {
        pageNum: this.pageNum++,
        pageSize: this.pageSize
      }).then(res => {
        let currentLists = res.data.lists
        if(this.isAllLoaded(this.pageSize, currentLists.length)){
          this.allLoaded = true
        }
        if(this.lists){
          this.lists = this.lists.concat(currentLists)
        }else{
          this.lists = currentLists
        }
        this.loading = false
      })
    },
    getBanner(){
      axios.get(url.banner).then(res => {
        this.bannerLists = res.data.lists
      })
    },
    isAllLoaded(pageSize, currentSize){
      if(pageSize > currentSize){
        return true
      }
    }
  },
  computed: {

  },
})
