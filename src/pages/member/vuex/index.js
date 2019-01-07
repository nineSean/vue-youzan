import Vue from 'vue'
import Vuex from 'vuex'
import Address from 'js/addressService.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    lists: null,
  },
  mutations: {
    init(state, lists){
      state.lists = lists
    },
    add(state, data){
      data.id = parseInt(Math.random()*1000000)
      state.lists.push(data)
    },
    update(state, data){
      const lists = JSON.parse(JSON.stringify(state.lists)) // 必须用深复制，否则无法监听update的数据变化
      const index = lists.findIndex(item => {
        return item.id == data.id
      })
      lists[index] = data
      state.lists = lists
      // state.lists.splice(index, 1, data)
    },
    remove(state, id){
      const index = state.lists.findIndex(item => {
        return item.id == id
      })
      state.lists.splice(index, 1)
    },
    setDefault(state, id){
      state.lists.forEach(item => {
        item.isDefault = item.id == id ? true : false
      })
      // const index = state.lists.findIndex(item => {
      //   return item.id == id
      // })
      // state.lists.forEach(item => {
      //   item.isDefault = false
      // })
      // state.lists[index].isDefault = true
    }
  },
  actions: {
    getLists({commit}){
      Address.list().then(res => {
        commit('init', res.data.lists)
      })
    },
    addAction({commit}, data){
      Address.add(data).then(res => {
        commit('add', data)
      })
    },
    updateAction({commit}, data){
      Address.update(data).then(res => {
        commit('update', data)
      })
    },
    removeAction({commit}, id){
      Address.remove(id).then(res => {
        commit('remove', id)
      })
    },
    setDefaultAction({commit}, id){
      Address.setDefault(id).then(res => {
        commit('setDefault', id)
      })
    }
  },
})

export default store

