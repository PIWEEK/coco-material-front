<template>
  <div class="about">
    <h1>This is an about page</h1>
    {{info && info.data}}
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'About',
  data () {
    return {
      info: null
    }
  },
  mounted () {
    axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => (this.info = response))
  }
}
</script>

<style lang="scss" scoped>
  @import '@/variables';

</style>
