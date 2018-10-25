import 'css/common.css'
import './index.css'
import Vue from 'vue';
import axios from 'axios'
import url from 'js/api.js'
import { InfiniteScroll } from 'mint-ui';
import Foot from 'components/Foot.vue'

Vue.use(InfiniteScroll);

const app = new Vue({
  el: '#app',
  data: {
    lists: null,
    pageNum: 1,
    pageSize: 6,
    loading: false,
    allLoaded: false,
  },
  components:{
    Foot
  },
  created(){
    this.getLists()
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
    isAllLoaded(pageSize, currentSize){
      if(pageSize > currentSize){
        return true
      }
    }
  },
  computed: {

  }
})
