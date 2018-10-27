import 'css/common.css'
import './search.css'

import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import url from 'js/api.js'
import mixin from 'js/mixin.js'

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
    fetch(){
      axios.post(url.searchLists, {id, keyword}).then(res => {
        this.searchLists = res.data.lists
      })
    }
  }
})
