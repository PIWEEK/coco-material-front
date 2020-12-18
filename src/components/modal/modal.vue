<template src="./modal.html" lang="html"></template>
<style src="./modal.scss"  lang="scss" scoped></style>

<script>
export default {
  name: 'modal',
  props: {
    vector: null,
    vectorId: null,
    customizeBulk: null,
    vectors: null,
    tags: null,
    isHorizontal: null,
    vectorTags: null
  },
  data () {
    return {
      fillColor: ['#FFFFFF', '#FF4E4E', '#FF9E48', '#FFD144', '#3CD77D', '#378CFF', '#D974FF', 'none'],
      strokeColor: ['#1C2541', '#FF4E4E', '#FF9E48', '#FFD144', '#3CD77D', '#378CFF', '#D974FF', '#FFFFFF'],
      svgCode: null,
      strokeHexValue: '#1C2541',
      backgroundHexValue: '#FFFFFF',
      hasJustStroke: false
    }
  },
  mounted () {
    const paths = document.querySelectorAll('#preview path')
    if (paths.length === 1) {
      this.hasJustStroke = true
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    selectStroke (color) {
      if (color.length === 7) {
        document.querySelectorAll('#preview path')[1].style.fill = color
        this.strokeHexValue = color
      } else {
        document.querySelectorAll('#preview path')[1].style.fill = '#1C2541'
      }
    },
    selectFill (color) {
      if (color.length === 7 || color === 'none') {
        document.querySelectorAll('#preview path')[0].style.fill = color
        if (this.hasJustStroke && color !== 'none') {
          this.strokeHexValue = color
        } else if (this.hasJustStroke && color === 'none') {
          document.querySelectorAll('#preview path')[0].style.fill = '#1C2541'
        } else {
          this.backgroundHexValue = color
        }
      } else {
        document.querySelectorAll('#preview path')[0].style.fill = 'none'
      }
    },
    downloadPng (size) {
      const bgColor = (this.backgroundHexValue === 'none' || !this.backgroundHexValue)
        ? 'none'
        : this.backgroundHexValue.replace('#', '')
      if (this.customizeBulk) {
        const tags = this.tags.length
          ? this.tags.join()
          : 'all'
        return `https://cocomaterial.com/api/download/?tags=${tags}&img_format=png&stroke=${this.strokeHexValue ? this.strokeHexValue.replace('#', '') : '1C2541'}&fill=${bgColor}&size=${size}`
      } else {
        return `https://cocomaterial.com/api/download/?id=${this.vectorId}&img_format=png&stroke=${this.strokeHexValue ? this.strokeHexValue.replace('#', '') : '1C2541'}&fill=${bgColor}&size=${size}`
      }
    },
    handleDownloadPng (size) {
      this.$matomo.trackEvent('downloads', `png-${size}`, this.vector.name)
    },
    searchVector (tag) {
      this.$emit('search', tag)
    }
  }
}
</script>
