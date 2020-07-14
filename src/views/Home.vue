<template>
  <section class="home">
    <div class="cta" :style="{ backgroundImage: 'url(' + require('@/assets/cta-pink.svg') + ')' }">
      <div class="container container-cta">
        <div class="section-text">
          <h1 class="title">Looking for the perfect illustration?</h1>
          <h2 class="subtitle">Discover the CocoMaterial, the Open Source hand-draw illustration library</h2>
          <a class="btn" href="#start">Start now</a>
        </div>
        <div class="section-img">
          <img alt="Person thinking" src="../assets/asking.svg" />
        </div>
      </div>
    </div>
    <div class="search-section" :style="{ backgroundImage: 'url(' + require('@/assets/customize.svg') + ')' }">
      <div class="container">
        <h3 id="start"  class="title">Customize & Download</h3>
        <p class="subtitle">Search by theme and customize the colors of the illustration to match your needs</p>
        <div class="search">
          <label for="search">Search</label>
          <input id="search" v-model="search" type="text" placeholder="Search by topic" @keyup.enter="searchIcon"/>
        </div>
      </div>
    </div>
    <div class=topics>
      <ul class="topics-list">
        <li>Food</li>
        <li>Pets</li>
        <li>Fruits</li>
      </ul>
    </div>
    <div class="svg-list">
      <span v-for="(vector, index) in vectorsList" :key="index">
        <img :src="vector.svg" />
      </span>
    </div>
    <div class="piweek-section">
      <div class="container">
        <h3 class="title">A PIWEEK project</h3>
        <p class="subtitle">CocoMaterial is a PIWEEK project.</p>
        <p class="subtitle">PIWEEK is an original idea by <span class="highlight">Kaleidos</span>. Every six months participants leave their ongoing work in standby to devote an entire week to personal innovative projects, either alone or joined by others.</p>
        <a class="btn-piweek" href="https://piweek.com/" target="_blank">Know more about PIWEEK</a>
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
  beforeMount () {
    this.getVectors()
  },
  computed: {
    ...mapGetters({
      vectorsList: 'vectorsList'
    })
  },
  methods: {
    ...mapActions({
      getVectors: 'getVectors',
      getVectorsByTag: 'getVectorByTag'
    }),
    searchIcon () {
      this.$store.dispatch('getVectorByTag', this.search)
      this.$router.push('results')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/variables';

  .container {
    margin: 0 70px;
  }

  .cta {
    background-position: 0% 72%;
    background-repeat: no-repeat;
    padding: 80px 0;
    background-size: 30%;
  }

  .container-cta {
    display: grid;
    grid-template-columns: 6fr 2fr;

    & .section-text {
      margin: auto;
    }

    & .title {
      font-size: 64px;
      font-weight: 700;
      margin-bottom: 35px;
      padding-right: 20%;
    }

    & .subtitle {
      color: $color-grey;
      font-size: 24px;
      font-weight: 500;
      line-height: 32px;
      margin-bottom: 35px;
      padding-right: 30%;
    }

    & .btn {
      background-color: $color-turquoise;
      border-radius: 6px;
      color: $color-black;
      display: block;
      font-weight: 700;
      padding: 15px 0;
      text-align: center;
      text-decoration: none;
      text-transform: uppercase;
      width: 190px;
    }
  }

  .search-section {
    background-size: cover;
    background-repeat: no-repeat;
    padding: 40px;
    text-align: center;

    & .title {
      font-size: 48px;
      font-weight: 700;
      margin-bottom: 20px;
    }

    & .subtitle {
      color: $color-grey;
      font-size: 18px;
      margin-bottom: 25px;
    }

    & .search {

      & label {
        position: absolute;
        top: -1000px;
      }

      input {
        border: 1px solid $color-black;
        border-radius: 3px;
        font-size: 16px;
        height: 48px;
        padding: 0 25px;
        width: 30%;
      }
    }
  }

  .piweek-section {
    background-size: cover;
    background-repeat: no-repeat;
    padding: 40px;
    text-align: center;

    & .title {
      font-size: 48px;
      font-weight: 700;
      margin-bottom: 20px;
    }

    & .subtitle {
      color: $color-grey;
      font-size: 14px;
      line-height: 24px;
      margin: auto;
      width: 60%;
    }

    & .highlight {
      color: $color-turquoise;
    }

    & .btn-piweek {
      display: inline-block;
      margin-top: 50px;
      background-color: transparent;
      border: 1px solid $color-turquoise;
      border-radius: 6px;
      color: $color-turquoise;
      font-weight: 700;
      padding: 15px 25px;
      text-align: center;
      text-decoration: none;
    }
  }

  .topics-list {
    list-style-type: none;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  .svg-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    & span, & img {
      height: 250px;
      text-align: center;
    }
  }

  .content {
    display: flex;
  }
</style>
