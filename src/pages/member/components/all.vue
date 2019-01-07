<template>
  <div class="container" style="min-height: 597px;">
    <div class="block-list address-list section section-first js-no-webview-block">
      <p v-if="lists&&!lists.length">没有地址，请添加</p>
      <a
        class="block-item js-address-item address-item"
        :class="{'address-item-default': list.isDefault}"
        v-for="list in lists"
        :key="list.id"
        v-if="lists&&lists.length"
      >
        <div class="address-title">{{list.name}} {{list.tel}}</div>
        <p>{{list.province}}{{list.city}}{{list.county}}{{list.address}}</p>
        <a class="address-edit" @click="toEdit(list)">修改</a>
      </a>
    </div>
    <div class="block stick-bottom-row center">
      <router-link
        class="btn btn-blue js-no-webview-block js-add-address-btn"
        :to="{name: 'form', params: {type: 'add'}}"
      >新增地址</router-link>
    </div>
  </div>
</template>

<script>
  // import Address from 'js/addressService.js'
  import Bus from 'js/eventBus.js'
  export default {
    computed: {
      lists(){
        return this.$store.state.lists
      }
    },
    created(){
      if(!this.lists){
        this.$store.dispatch('getLists')
      }
    },
    mounted(){
      Bus.$on('setDefault', id => {
        const index = this.lists.findIndex(item => {
          return item.id == id
        })
        this.$nextTick(()=>{
          this.lists[index].isDefault = true // 视图和vue-devtools的数据都没改变，但是下面控制台打印已改变？？？
          console.log(this.lists)
        })
      })
      Bus.$on('setDefault', id => {
        const index = this.lists.findIndex(item => {
          return item.id == id
        })
        this.lists[index]
      })
    },
    methods: {
      toEdit(param){
        this.$router.push({name: 'form', params: {
          type: 'edit',
          instance: param
        }})
      }
    }
  }
</script>
