
export default {
  data(){
    return {
      name: '',
      id: '',
      tel: '',
      address: '',
      provinceZip: -1,
      cityZip: -1,
      districtZip: -1,
      type: '',
      instance: '',
      addressData: require('js/address.json'),
      cityList: null,
      districtList: null,
    }
  },
  created(){
    let params = this.$route.params
    this.type = params.type
    this.instance = params.instance
  },
  watch: {
    provinceZip(val){
      if(val == -1) return
      const list = this.addressData.list
      const index = list.findIndex(item => {
        return item.value == val
      })
      this.cityList = list[index].children
      this.cityZip = -1
      this.districtZip = -1
    },
    cityZip(val){
      if(val == -1) return
      const list = this.cityList
      const index = list.findIndex(item => {
        return item.value == val
      })
      this.districtList = list[index].children
      this.districtZip = -1
    }
  }
}
