<template>
  <section class="home">
    <div class="action-bar">
      <div class="search">
        <label for="search">Search</label>
        <input id="search" v-model="search" type="text" placeholder="Search" @keyup="searchIcon"/>
      </div>
      <div class="colors">
        Colores
      </div>
      <div class="download">
        Download
      </div>
    </div>
    <div class=content>
      <ul class="categories">
        <li>Food</li>
        <li>Pets</li>
        <li>Fruits</li>
      </ul>
      <div class="svg-list">
        aquí todos los svgs
        <img src="../assets/idea.svg" />
      </div>
    </div>
  </section>
</template>

<script>

export default {
  name: 'Home',
  components: {
    // 'svg-icon': SvgIcon
  },
  data () {
    return {
      search: ''
    }
  },
  methods: {
    searchIcon () {
      console.log(this.search)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/variables';

  .action-bar {
    display: flex;
    margin: 10 0;
    width: 100%;

    & div {
      margin: 0 10;
    }
  }

  .categories {
    list-style-type: none;
  }

  .content {
    display: flex;
  }
</style>
