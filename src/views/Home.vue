<template>
  <section class="home">
    <div class="cta">
      <div class="container container-cta">
        <div class="section-text">
          <h1 class="title">Looking for the perfect illustration?</h1>
          <h2 class="subtitle">Discover the CocoMaterial, the Open Source hand-drawn illustration library</h2>
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
              @keyup="autocompleteSearch"
              @keydown.down="focusAutocompleteResults(-1, 'down')"/>
          </div>
          <div id="results" ref="results" v-if="autocompleteResults.length" class="autocomplete-results">
            <span
              tabindex="1"
              v-for="(result, index) in autocompleteResults"
              :key="index"
              @click="addTag(result.slug)"
              @keyup.enter="addTag(result.slug)"
              @keydown.up="focusAutocompleteResults(index, 'up')"
              @keydown.down="focusAutocompleteResults(index, 'down')">
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
          <button @click="searchVector('object')">View all</button>
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
          <button @click="searchVector('chart')">View all</button>
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
          <button @click="searchVector('social')">View all</button>
        </div>
        <img src="../assets/topics/rrss.svg" />
      </div>

    </div>
    <div id="piweek" class="piweek-section">
      <div class="container">
        <h3 class="title">A PIWEEK project</h3>
        <p class="subtitle">CocoMaterial is a PIWEEK project.</p>
        <p class="subtitle">PIWEEK is an original idea by <a href="https://kaleidos.net/" target="_blank" class="highlight">Kaleidos</a>. Every six months participants leave their ongoing work in standby to devote an entire week to personal innovative projects, either alone or joined by others.</p>
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
    focusAutocompleteResults (index, key) {
      if (this.autocompleteResults.length) {
        if (key === 'down') {
          const element = document.querySelectorAll('#results span')[index + 1]
          element.focus()
          if (index === -1) {
            setTimeout(() => {
              document.querySelector('#results').scrollTop = 0
            }, 100)
          }
        } else if (key === 'up' && index === 0) {
          document.querySelector('#search').focus()
        } else {
          const element = document.querySelectorAll('#results span')[index - 1]
          element.focus()
        }
      }
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
        this.$store.dispatch('getVectorByTag', [search.toLocaleLowerCase()])
      } else {
        this.$store.dispatch('getVectorByTag', [this.search.toLocaleLowerCase()])
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

    @media (max-width: 768px) {
      margin: 0;
    }
  }

  .cta {
    background-position: 0% 72%;
    background-repeat: no-repeat;
    padding: 80px 0;
    background-size: 30%;
    background-image:none;

    @media (max-width: 768px) {
      padding: 20px 0;
    }
  }

  .container-cta {
    display: grid;
    grid-template-columns: 6fr 2fr;
    margin: 0 auto;
    max-width: 1440px;

    @media (max-width: 1440px) {
      padding: 0 70px;
    }

    @media (max-width: 768px) {
      background-image: url("../assets/pink-buble.svg");
      background-repeat: no-repeat;
      background-position: -100px -40px;
      background-size: 50%;
      grid-template-columns: 2fr 1fr;
      padding: 0 20px;
    }

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

        @media (max-width: 768px) {
          display: none;
        }
      }
    }

    & .title {
      font-size: 64px;
      font-weight: 700;
      margin-bottom: 35px;
      padding-right: 20%;

      @media (max-width: 768px) {
        font-size: 36px;
        padding-right: 5%;
      }
    }

    & .subtitle {
      color: $color-grey;
      font-size: 24px;
      font-weight: 500;
      line-height: 32px;
      margin-bottom: 50px;
      padding-right: 30%;

      @media (max-width: 768px) {
        font-size: 16px;
        padding-right: 5%;
      }
    }

    & .section-img {
      @media (max-width: 768px) {
        align-self: end;
      }
      & img {
        @media (max-width: 768px) {
          max-width: 100%;
        }
      }
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

    @media (max-width: 768px) {
        padding: 20px;
        background-size: 100%;
      }

    & .title {
      font-size: 48px;
      font-weight: 700;
      margin-bottom: 20px;

      @media (max-width: 768px) {
        font-size: 18px;
      }
    }

    & .subtitle {
      color: $color-grey;
      font-size: 18px;
      margin-bottom: 25px;

      @media (max-width: 768px) {
        font-size: 14px;
      }
    }

    & .search {
      margin: auto;
      position: relative;
      width: 420px;

      @media (max-width: 768px) {
        width: 100%;
      }

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

        @media (max-width: 768px) {
          width: 100%;
        }

        & span {
          background-color: $color-white;
          font-weight: 500;
          display: block;
          padding: 10px 25px;
          text-align: left;
          transition: all .3s ease;

          &:hover,
          &:focus {
            outline: none;
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

    @media (max-width: 768px) {
      padding: 20px;
    }

    & .title {
      font-size: 48px;
      font-weight: 700;
      margin-bottom: 20px;

      @media (max-width: 768px) {
        font-size: 18px;
      }
    }

    & .subtitle {
      color: $color-grey;
      font-size: 14px;
      line-height: 24px;
      margin: auto;
      max-width: 700px;

      @media (max-width: 768px) {
        max-width: 100%;
      }
    }

    & .highlight {
      color: $color-turquoise;
      text-decoration: none;
      font-weight: 700;

      &:active {
        color: $color-turquoise;
        font-size: 14px;
        font-weight: 500;
      }
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
    column-gap: 20px;
    grid-template-columns: 1fr 1fr 1fr;
    margin-top: 80px;
    row-gap: 50px;
    max-width: 1440px;
    margin:80px auto 0 auto;

    @media (max-width: 1200px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .topic {
    margin: auto;

    @media (max-width: 768px) {
      width: 100%;
    }

    & .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 30px;
    }

    & .title {
      font-size: 24px;
      margin: 0;

      @media (max-width: 768px) {
        font-size: 14px;
      }
    }

    & button {
      background-color: transparent;
      border: 2px solid $color-turquoise;
      border-radius: 4px;
      font-family: 'Red Hat Display', sans-serif;
      font-size: 14px;
      font-weight: 500;
      padding: 5px 15px;

      @media (max-width: 768px) {
        padding: 5px 8px;
      }
    }

    & img {
      @media (max-width: 768px) {
        width: 100%;
      }
    }
  }

  .content {
    display: flex;
  }
</style>
