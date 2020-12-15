<template src="./App.html" lang="html"></template>
<style src="./App.scss"  lang="scss" scoped></style>

<script>
export default {
  name: 'app',
  data () {
    return {
      navOpen: false
    }
  },
  methods: {
    openNav () {
      this.navOpen = !this.navOpen
    }
  }
}
</script>
