<template>
  <div :html="require(`html-loader!../assets/idea.svg`)" class="svg-container"></div>

</template>

<script lang="ts">
import Vue from 'vue'

function recursivelyRemoveFill (el: Element) {
  if (!el) {
    return
  }
  el.removeAttribute('fill');
  [].forEach.call(el.children, child => recursivelyRemoveFill(child))
}

export default Vue.extend({
  name: 'SvgIcon',
  props: {
    icon: {
      type: String,
      default: null
    },
    hasFill: {
      type: Boolean,
      default: false
    },
    growByHeight: {
      type: Boolean,
      default: true
    }
  },
  mounted () {
    if (this.$el.firstElementChild!.nodeName === 'svg') {
      const svgElement = this.$el.firstElementChild
      // use `viewBox` attribute to get the svg's inherent width and height
      const viewBox = svgElement && svgElement.getAttribute('viewBox')!.split(' ').map(n => Number(n))
      const widthToHeight = viewBox && (viewBox[2] / viewBox[3]).toFixed(2)
      if (this.hasFill && svgElement) {
        // recursively remove all fill attribute of element and its nested children
        recursivelyRemoveFill(svgElement)
      }
      // set width and height relative to font size
      // if growByHeight is true, height set to 1em else width set to 1em and remaining is calculated based on widthToHeight ratio
      if (this.growByHeight && svgElement) {
        svgElement.setAttribute('height', '1em')
        svgElement.setAttribute('width', `${widthToHeight}em`)
      } else {
        svgElement && svgElement.setAttribute('width', '1em');
        (svgElement && widthToHeight) && svgElement.setAttribute('height', `${1 / parseInt(widthToHeight)}em`)
      }
      svgElement && svgElement.classList.add('svg-class')
    }
  }
})
</script>

<style scoped lang="scss">
  svg-container {
      display: inline-flex;
  }
  .svg-class {
      vertical-align: middle;
  }
</style>
