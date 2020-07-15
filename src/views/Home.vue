<template>
  <section class="home">
    <div class="cta" :style="{ backgroundImage: `url(${require('@/assets/cta-pink.svg')})`}">
      <div class="container container-cta">
        <div class="section-text">
          <h1 class="title">Looking for the perfect illustration?</h1>
          <h2 class="subtitle">Discover the CocoMaterial, the Open Source hand-draw illustration library</h2>
          <a class="btn" href="#start">Start now</a>
        </div>
        <div class="section-img">
          <img alt="Person thinking illustration" src="../assets/asking.svg" />
        </div>
      </div>
    </div>
    <div class="search-section" :style="{ backgroundImage: `url(${require('@/assets/customize.svg')})`}">
      <div class="container">
        <h3 id="start"  class="title">Customize & Download</h3>
        <p class="subtitle">Search by theme and customize the colors of the illustration to match your needs</p>
        <div class="search">
          <label for="search">Search</label>
          <input id="search" v-model="search" type="text" placeholder="Search by topic" @keyup.enter="searchVector"/>
        </div>
      </div>
    </div>
    <div class=topics>
      <div class="topic">
        <div class="top">
          <h5 class="title">Technology</h5>
          <button @click="searchVector('technology')">View all</button>
        </div>
        <img src="../assets/topics/tech.svg" />
      </div>
      <div class="topic">
        <div class="top">
          <h5 class="title">Science</h5>
          <button @click="searchVector('science')">View all</button>
        </div>
        <img src="../assets/topics/science.svg" />
      </div>
      <div class="topic">
        <div class="top">
          <h5 class="title">Objects</h5>
          <button @click="searchVector('objects')">View all</button>
        </div>
        <img src="../assets/topics/objects.svg" />
      </div>
      <div class="topic">
        <div class="top">
          <h5 class="title">Food</h5>
          <button @click="searchVector('food')">View all</button>
        </div>
        <img src="../assets/topics/food.svg" />
      </div>
      <div class="topic">
        <div class="top">
          <h5 class="title">People</h5>
          <button @click="searchVector('people')">View all</button>
        </div>
        <img src="../assets/topics/people.svg" />
      </div>
      <div class="topic">
        <div class="top">
          <h5 class="title">Charts</h5>
          <button @click="searchVector('charts')">View all</button>
        </div>
        <img src="../assets/topics/charts.svg" />
      </div>
      <div class="topic">
        <div class="top">
          <h5 class="title">Emojis</h5>
          <button @click="searchVector('emojis')">View all</button>
        </div>
        <img src="../assets/topics/emojis.svg" />
      </div>
      <div class="topic">
        <div class="top">
          <h5 class="title">Office</h5>
          <button @click="searchVector('office')">View all</button>
        </div>
        <img src="../assets/topics/office.svg" />
      </div>
      <div class="topic">
        <div class="top">
          <h5 class="title">Social</h5>
          <button @click="searchVector('rrss')">View all</button>
        </div>
        <img src="../assets/topics/rrss.svg" />
      </div>

    </div>
    <div id="piweek" class="piweek-section">
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

import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Home',
  data () {
    return {
      vectors: null,
      search: ''
    }
  },
  beforeMount () {
    this.getTags()
    this.clearSearchTags()
  },
  computed: {
    ...mapGetters({
      tagsList: 'tagsList'
    })
  },
  methods: {
    ...mapActions({
      getTags: 'getTags',
      getVectorsByTag: 'getVectorByTag'
    }),
    ...mapMutations({
      clearSearchTags: 'clearSearchTags'
    }),
    searchVector (search) {
      const textToSearch = typeof search === 'string' ? search : this.search
      this.$store.dispatch('getVectorByTag', textToSearch)
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

  .topics {
    display: grid;
    column-gap: 50px;
    grid-template-columns: 1fr 1fr 1fr;
    margin-top: 80px;
    row-gap: 50px;
  }

  .topic {
    margin: auto;

    & .top {
      display: flex;
      justify-content: space-between;
      padding: 0 30px;
    }

    & .title {
      font-size: 24px;
      margin: 0;
    }

    & button {
      background-color: transparent;
      border: 2px solid $color-turquoise;
      border-radius: 4px;
      font-family: 'Red Hat Display', sans-serif;
      font-size: 14px;
      font-weight: 500;
      padding: 5px 15px;
    }
  }

  .content {
    display: flex;
  }
</style>
