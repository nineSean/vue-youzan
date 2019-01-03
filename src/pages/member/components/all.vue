<template>
  <div class="container" style="min-height: 597px;">
    <div class="block-list address-list section section-first js-no-webview-block">
      <p v-if="lists&&!lists.length">没有地址，请添加</p>
      <a
        class="block-item js-address-item address-item"
        :class="{'address-item-default': list.isDefault}"
        @click="toEdit"
        v-for="list in lists"
        :key="list.id"
        v-if="lists&&lists.length"
      >
        <div class="address-title">{{list.name}} {{list.tel}}</div>
        <p>{{list.province}}{{list.city}}{{list.county}}{{list.address}}</p>
        <a class="address-edit">修改</a>
      </a>
    </div>
    <div class="block stick-bottom-row center">
      <router-link
        class="btn btn-blue js-no-webview-block js-add-address-btn"
        to="form"
      >新增地址</router-link>
    </div>
  </div>
</template>

<script>
  import Address from 'js/addressService.js'
  export default {
    data(){
      return {
        lists: null,
      }
    },
    created(){
      Address.list().then(res => {
        this.lists = res.data.lists
      })
    },
    methods: {
      toEdit(){
        this.$router.push({path: '/address/form'})
      }
    }
  }
</script>
