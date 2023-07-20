<template src="./CocoFonts.html" lang="html"></template>
<style src="./CocoFonts.scss"  lang="scss" scoped></style>

<script>
import { defineComponent } from 'vue'
import { mapState, mapActions } from 'vuex'

export default defineComponent({
  name: 'CocoFonts',
  computed: {
    ...mapState('resources', {
      lettersFont: state => state.lettersFont,
      emojisFont: state => state.emojisFont
    })
  },
  beforeMount () {
    this.getResources()
  },
  methods: {
    ...mapActions({
      getResources: 'resources/getResources'
    })
  }
})
</script>
