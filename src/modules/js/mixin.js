import Foot from 'components/Foot.vue'

const mixin = {
  components: {
    Foot
  },
  filters: {
    format(n){
      return String(parseInt(Number(n)*100)).replace(/(\d{2})$/, '.$1')
    }
  }
}

export default mixin
