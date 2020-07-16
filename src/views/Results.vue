<template>
  <div class="results">
    <aside class="tags">
      <p>Popular tags</p>
      <ul class="tags-list">
        <li>Food</li>
        <li>Pets</li>
        <li>Fruits</li>
      </ul>
    </aside>
    <section class="results-data">
      <div class="menu">
        <form autocomplete="off" class="search">
          <label for="search">Search results for: </label>
          <div class="relative">
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
          </div>
          <span v-if="filteredVectorsList.length" class="info-text">Showing {{filteredVectorsList.length}} results</span >
        </form>
        <div  v-if="filteredVectorsList.length" class="vectors-actions">
          <button class="btn-color">
            <img alt="Palette icon" src="../assets/palette.svg"/>
            <span>Customize all</span></button>
          <button class="btn-download">Download all SVG</button>
        </div>
      </div>
      <div v-if="filteredVectorsList.length" class="results-list">
        <div class="vector-container" v-for="(vector, index) in filteredVectorsList" :key="index">
          <div class="img-container">
            <img :id="index" :alt="vector.name" :src="vector.svg" @load="loaded(index)"/>
          </div>
          <div class="download-btn">
            <button class="btn svg">SVG</button>
            <button class="btn png" @click="showModal(vector)">PNG</button>
          </div>
        </div>
      </div>
      <div v-else class="no-results">
        <img alt="Coconut illustration" src="../assets/coco.svg" />
        <h3>Sorry, this coconut is empty</h3>
        <div>
          <span>We didn't find any result matching "</span>
          <span class="highlight">
            <span v-for="(tag, index) in searchTags" :key="index">
              {{tag}}
            </span>
          </span>
          <span>".</span>
        </div>
        <p>Please try a different search term or look within our <strong>popular tags</strong></p>
      </div>
    </section>
    <modal
      v-if="isModalVisible && filteredVectorsList.length"
      :vector="svgCode"
      @close="closeModal"
    />
  </div>
</template>

<script>

import { mapGetters, mapActions, mapMutations } from 'vuex'
import modal from '../components/modal/modal.vue'

export default {
  name: 'Results',
  components: {
    modal
  },
  data () {
    return {
      search: '',
      isModalVisible: false,
      selectedVector: null,
      svgCode: null,
      tagsToSearch: [],
      autocompleteResults: []
    }
  },
  computed: {
    ...mapGetters({
      filteredVectorsList: 'filteredVectorsList',
      searchTags: 'searchTags',
      tagsList: 'tagsList'
    }),
    ...mapActions({
      getVectorsByTag: 'getVectorByTag'
    }),
    ...mapMutations({
      clearFilteredVectors: 'clearFilteredVectors'
    })
  },
  beforeMount () {
    this.tagsToSearch = this.searchTags.length && [...this.searchTags]
  },
  methods: {
    showModal (vector) {
      this.selectedVector = vector
      var xmlHttp = new XMLHttpRequest()
      xmlHttp.open('GET', vector.url, false)
      xmlHttp.send(null)
      this.svgCode = JSON.parse(xmlHttp.responseText).svg_content
      this.isModalVisible = true
    },
    closeModal () {
      this.isModalVisible = false
    },
    loaded (id) {
      const height = document.getElementById(`${id}`).clientHeight
      const width = document.getElementById(`${id}`).clientWidth
      document.getElementById(id).className = height > width ? 'vertical' : 'horizontal'
    },
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
      this.$store.dispatch('getVectorByTag', this.tagsToSearch)
    },
    removeTag (tag) {
      const index = this.tagsToSearch.findIndex(it => it === tag)
      this.tagsToSearch.splice(index, 1)
      if (this.tagsToSearch.length) {
        this.$store.dispatch('getVectorByTag', this.tagsToSearch)
      } else {
        this.clearFilteredVectors()
      }
    },
    searchVector (search) {
      if (this.tagsToSearch.length) {
        this.$store.dispatch('getVectorByTag', this.tagsToSearch)
      } else {
        this.$store.dispatch('getVectorByTag', [this.search])
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/variables';

  .results {
    display: grid;
    grid-template-columns: 1fr 6fr;
    margin: 70px;
  }

  .search {
    display: flex;
    align-items: center;

    & label {
      font-size: 18px;
      font-weight: 500;
      margin-right: 5px;
    }

      & .relative {
        position: relative;
      }

    & .search-input-wrapper {
        display: flex;
        align-items: center;
        background-color: $color-white;
        border: 1px solid $color-black;
        border-radius: 3px;
        box-sizing: border-box;
        height: 32px;
        margin-right: 10px;
        padding: 5px 10px;
      }

      & .tag {
         background-color: $color-pink;
         font-size: 14px;
         margin-right: 5px;
         padding: 2px 10px;

         &:hover {
           cursor: pointer;
         }
      }

      & input {
        background-color: transparent;
        border: none;
        height: 30px;
        font-size: 16px;

        &:focus {
          outline: none;
        }
      }

      & .autocomplete-results {
        background-color: $color-white;
        position: absolute;
        top: 32px;
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

    & .info-text {
      color: $color-grey;
      font-size: 14px;
    }
  }

  .vectors-actions {
    width: 40%;
    text-align: right;
  }

  .btn-color,
  .btn-download {
    font: 500 14px 'Red Hat Display';
    border-radius: 4px;
    padding: 5px 20px;
  }

  .btn-color {
    background-color: $color-light-grey;
    border: 2px solid $color-light-grey;
    margin-right: 20px;

    & img {
      margin-right: 10px;
      vertical-align: middle;
    }
  }

  .btn-download {
    background-color: transparent;
    border: 2px solid $color-turquoise;
  }

  .menu {
    display: flex;
    justify-content: space-between;
    margin-bottom: 35px;
  }

  .tags {
    & p {
      font-weight: 700;
      font-size: 14px;
      margin: 50px 0 30px;
    }

    & .tags-list {
      margin: 0;
      padding: 0;
      list-style-type: none;

      & li {
        margin: 15px 0;
      }
    }
  }

  .results-list {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 30px;
    row-gap: 50px;

    & .download-btn {
      width: 100%;
    }

    & .btn {
      background-color: transparent;
      border: 2px solid $color-turquoise;
      border-radius: 4px;
      padding: 5px;
      transition: all ease .3s;
      width: 46%;

      &:hover {
        background-color: $color-turquoise;
        color: $color-white;
      }
    }

    & .svg {
      margin-right: 8%;
    }

    & .img-container {
      border: 1px solid #F2F2F2;
      display: flex;
      height: 150px;
      margin-bottom: 10px;
      padding: 8%;
    }

    & img {
      margin: auto;

      &.vertical {
         height: 125px;
      }

      &.horizontal {
        width: 125px;
      }
    }
  }

  .no-results {
    margin: 70px 0;
    text-align: center;

    & h3 {
      font-size: 36px;
      margin: 20px 0 15px;
    }

    & p {
      color: $color-grey;
      font-size: 16px;
      font-weight: 500;
    }

    & strong {
      font-size: 16px;
    }

    & .highlight {
      color: $color-turquoise;
    }
  }

</style>
