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
        <span v-for="(vector, index) in vectorsList" :key="index">
          {{vector.svg}}
        </span>
      </div>
    </div>
  </section>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Home',
  data () {
    return {
      vectors: null,
      search: ''
    }
  },
  created () {
    console.log('mounted!')
    this.getVectors()
    console.log('vectorsList', this.vectorsList)
  },
  computed: {
    ...mapGetters({
      vectorsList: 'vectorsList'
    })
  },
  methods: {
    ...mapActions({
      getVectors: 'getVectors'
    }),
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
