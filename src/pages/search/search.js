import 'css/common.css'
import './search.css'
import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import url from 'js/api.js'
import mixin from 'js/mixin.js'
import Velocity from 'velocity-animate'

let {id, keyword} = qs.parse(location.search.substr(1))
const search = new Vue({
  el: '.container',
  mixins: [mixin],
  data: {
    searchLists: null,
    keyword,
    isShowed: false,
  },
  created(){
    this.fetch()
  },
  methods: {
    toShowOrNot(){
      this.isShowed = scrollY > 160 ? true : false
    },
    toTop(){
      Velocity(document.body, 'scroll', {duration: 600, offset: 0})
    },
    fetch(){
      axios.post(url.searchLists, {id, keyword}).then(res => {
        this.searchLists = res.data.lists
      })
    }
  }
})
