import Address from 'js/addressService.js'
import Bus from 'js/eventBus.js'
import {mapState} from 'vuex'

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
    if(this.type == 'edit'){
      const list = this.instance
      this.name = list.name
      this.id = list.id
      this.tel = list.tel
      this.address = list.address
      this.provinceZip = list.provinceZip
    }
  },
  beforeDestroy(){
    Bus.$off('setDefault')
  },
  computed: mapState([
    'lists'
  ]),
  // computed: mapState({
  //   lists: state => state.lists
  // }),
  // computed: {
  //   lists(){
  //     return this.$store.state.lists
  //   },
  // },
  methods: {
    add(){
      //待校验非空与非法字符
      let {name, id, tel, address, provinceZip, cityZip, districtZip} = this
      let data = {name, id, tel, address, provinceZip, cityZip, districtZip}
      if(this.type == 'add'){
        this.$store.dispatch('addAction', data)
      }else if(this.type == 'edit'){
        this.$store.dispatch('updateAction', data)
      }
    },
    remove(){
      window.confirm('请确认是否删除该地址') ? this.$store.dispatch('removeAction', this.id) : 1
    },
    setDefault(){
      this.$store.dispatch('setDefaultAction', this.id)
    },
    changeCity(val){
      console.log(val)
    }
  },
  watch: {
    lists: {
      handler(){
        this.$router.go(-1)
      },
      deep: true,
    },
    provinceZip(val){
      if(val == -1) return
      const list = this.addressData.list
      const index = list.findIndex(item => {
        return item.value == val
      })
      this.cityList = list[index].children
      this.cityZip = -1
      this.districtZip = -1
      if(this.type == 'edit'){
        this.cityZip = this.instance.cityZip
      }
    },
    cityZip(val){
      if(val == -1) return
      const list = this.cityList
      const index = list.findIndex(item => {
        return item.value == val
      })
      this.districtList = list[index].children
      this.districtZip = -1
      if(this.type == 'edit'){
        this.districtZip = this.instance.countyZip
      }
    }
  }
}
