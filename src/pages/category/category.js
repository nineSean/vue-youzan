import 'css/common.css'
import './category.css'
import Vue from 'vue';
import axios from 'axios'
import url from 'js/api.js'
import { InfiniteScroll } from 'mint-ui';
import mixin from 'js/mixin.js'

const category = new Vue({
  el: '#category',
  mixins: [mixin],
  data(){
    return {
      topLists: null,
      currentIndex: 0,
      subData: null,
      rankData: null,
    }
  },
  methods: {
    fetchData(option){
      axios.get(url[option]).then(res => {
        option == 'topLists' ? this[option] = res.data.lists : this[option] = res.data.data
      }).catch(error => {
        console.log(error)
      })
    },
    getSubOrRank(index){
      this.currentIndex = index
      if(index==0){
        this.fetchData('rankData')
      }else{
        this.fetchData('subData')
      }
    },
  },
  created(){
    this.fetchData('topLists')
    this.fetchData('rankData')
  },
})
