<template>
  <section class="home">
    <div class="cta">
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
    <div class="search-section" :style="{ backgroundImage: `url(${require('@/assets/bg-customize.svg')})`}" @click="closeAutocomplete">
      <div class="container">
        <h3 id="start"  class="title">Customize & Download</h3>
        <p class="subtitle">Search by theme and customize the colors of the illustration to match your needs</p>
        <form autocomplete="off" class="search" onsubmit="return false;">
          <label for="search">Search</label>
          <div class="search-input-wrapper">
            <span
              class="tag"
              v-for="(tag, index) in tagsToSearch"
              :key="index"
              @click="removeTag(tag)">x {{tag}}</span>
            <input
              id="search"
              ref="search"
              v-model="search"
              type="text"
              :placeholder="`${tagsToSearch.length ? '' : 'Search by topic'}`"
              @keyup.enter="searchVector"
              @keyup="autocompleteSearch"/>
          </div>
          <div ref="results" v-if="autocompleteResults.length" class="autocomplete-results">
            <span
              v-for="(result, index) in autocompleteResults"
              :key="index"
              @click="addTag(result.slug)">
              {{result.slug}}
            </span>
          </div>
        </form>
      </div>
    </div>
    <div class=topics @click="closeAutocomplete">
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
      search: '',
      tagsToSearch: [],
      autocompleteResults: []
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
    autocompleteSearch () {
      this.autocompleteResults = this.tagsList.filter(it => it.slug.includes(this.search))
    },
    closeAutocomplete () {
      this.autocompleteResults = []
    },
    addTag (tag) {
      this.tagsToSearch.push(tag)
      this.search = ''
      this.$refs.search.focus()
      this.autocompleteResults = []
    },
    removeTag (tag) {
      const index = this.tagsToSearch.findIndex(it => it === tag)
      this.tagsToSearch.splice(index, 1)
    },
    searchVector (search) {
      if (this.tagsToSearch.length) {
        this.$store.dispatch('getVectorByTag', this.tagsToSearch)
      } else if (typeof search === 'string') {
        this.$store.dispatch('getVectorByTag', [search])
      } else {
        this.$store.dispatch('getVectorByTag', [this.search])
      }
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
    background-image:none;
  }

  .container-cta {
    display: grid;
    grid-template-columns: 6fr 2fr;
    margin: 0 auto;
    max-width: 1600px;

    & .section-text {
      margin: auto;
      position:relative;
      &:before{
        content: url("../assets/pink-buble.svg");
        display: block;
        position: absolute;
        z-index: -1;
        top: -50%;
        left: -40%;
      }
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
      margin-bottom: 50px;
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
    background-size: 1600px;
    background-repeat: repeat-x;
    background-position: center;
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
      margin: auto;
      position: relative;
      width: 420px;

      & label {
        position: absolute;
        top: -100000px;
      }

      & .search-input-wrapper {
        display: flex;
        align-items: center;
        background-color: $color-white;
        border: 1px solid $color-black;
        border-radius: 3px;
        box-sizing: border-box;
        height: 48px;
        padding: 0 25px;
        width: 100%;
      }

      & .tag {
         background-color: $color-pink;
         font-size: 14px;
         margin-right: 5px;
         padding: 5px 10px;

         &:hover {
           cursor: pointer;
         }
      }

      & input {
        background-color: transparent;
        border: none;
        height: 46px;
        font-size: 16px;

        &:focus {
          outline: none;
        }
      }

      & .autocomplete-results {
        background-color: $color-white;
        position: absolute;
        top: 48px;
        border: 1px solid $color-grey;
        border-radius: 3px;
        height: 200px;
        overflow-y: scroll;
        width: 420px;

        & span {
          background-color: $color-white;
          font-weight: 500;
          display: block;
          padding: 10px 25px;
          text-align: left;
          transition: all .3s ease;

          &:hover {
            background-color:$color-turquoise;
            color: $color-white;
            cursor: pointer;
          }
        }
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
      max-width: 700px;
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
    column-gap: auto;
    grid-template-columns: 1fr 1fr 1fr;
    margin-top: 80px;
    row-gap: 50px;
    max-width: 1000px;
    margin:80px auto 0 auto;

    @media (max-width: 1200px) {
      grid-template-columns: 1fr 1fr;
    }

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
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
