<template src="./Team.html" lang="html"></template>
<style src="./Team.scss"  lang="scss" scoped></style>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Team',
  data () {
    return {
      members: [
        { name: 'Marina López', position: 'Front-End Developer', link: 'https://kaleidos.net/FF8A80/' },
        { name: 'Natacha Menjibar', position: 'UX/UI Designer', link: 'https://kaleidos.net/492858/' },
        { name: 'Esther Moreno', position: 'Creator & Illustrator', link: 'https://kaleidos.net/720B34/' },
        { name: 'Yamila Moreno', position: 'Back-End Developer', link: 'https://kaleidos.net/D70A53/' },
        { name: 'Ramiro Sánchez', position: 'Front-End Developer', link: 'https://kaleidos.net/E32841/' },
        { name: 'David Barragán', position: 'Naive Developer', link: 'https://kaleidos.net/FFF8E7/' }
      ]
    }
  }
})
</script>
