<template>
  <div class="results">
    <aside class="tags" @click="closeAutocomplete">
      <p>Popular tags</p>
      <ul class="tags-list">
        <li><button class="popular-btn" @click="searchVector('face')">Face</button></li>
        <li><button class="popular-btn" @click="searchVector('transportation')">Transportation</button></li>
        <li><button class="popular-btn" @click="searchVector('social')">Social</button></li>
        <li><button class="popular-btn" @click="searchVector('nature')">Nature</button></li>
        <li><button class="popular-btn" @click="searchVector('food')">Food</button></li>
      </ul>
    </aside>
    <section class="results-data"  @click="closeAutocomplete">
      <div class="menu">
        <form autocomplete="off" class="search" onsubmit="return false;">
          <label for="search">Search results for: </label>
          <div class="relative">
            <div class="search-input-wrapper">
              <span
                class="tag"
                v-for="(tag, index) in searchTags"
                :key="index"
                @click="removeTag(tag)">x {{tag}}</span>
              <input
                id="search"
                ref="search"
                v-model="search"
                type="text"
                @keyup.delete="handleDelete"
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
          </div>
        </form>
        <span v-if="filteredVectorsList.length" class="info-text">Showing {{filteredVectorsList.length}} results</span >

        <div v-if="filteredVectorsList.length" class="vectors-actions" @click="closeAutocomplete">
          <button class="btn-color" @click="showModal(filteredVectorsList[0], true, 0)">
            <img alt="Palette icon" src="../assets/palette.svg"/>
            <span>Customize all</span></button>
          <a :href="downloadAllSvg" target="_blank" class="btn-download">Download all SVG</a>
        </div>
      </div>
      <div v-if="filteredVectorsList.length" class="results-list"  @click="closeAutocomplete">
        <div class="vector-container" v-for="(vector, index) in filteredVectorsList.slice(0, limitNumber)" :key="index">
          <div class="img-container">
            <div class="svg-container" :id="index" :alt="vector.name" @load="loaded(index)" v-bind:style="{ backgroundImage: 'url(' + vector.svg + ')' }"></div>
          </div>
          <div class="download-btn">
            <a :href="downloadSvg(vector)" @click="handleDownloadSvg(vector)" target="_blank" class="btn svg">SVG</a>
            <button class="btn png" @click="showModal(vector, false, index)">PNG</button>
          </div>
        </div>
      </div>
      <div v-else class="no-results"  @click="closeAutocomplete">
        <img alt="Coconut illustration" src="../assets/coco.svg" />
        <h3>Sorry, this coconut is empty</h3>
        <div v-if="searchTags.length">
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

      <transition name="fade" mode="out-in">
        <button v-if="showScrollToTop" class="scroll-to-top" @click="scrollToTop()">
          <img src="../assets/arrow-top.svg" alt="Scroll to top" />
        </button>
      </transition>

    </section>
    <modal
      v-if="isModalVisible && filteredVectorsList.length"
      :vector="svgCode"
      :customizeBulk="customizeBulk"
      :vectors="filteredVectorsList.length"
      :vectorId="selectedVector.id"
      :tags="searchTags"
      :isHorizontal="isHorizontal"
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
      autocompleteResults: [],
      customizeBulk: false,
      isHorizontal: true,
      limitNumber: 30,
      showScrollToTop: false
    }
  },
  beforeMount () {
    !this.searchTags.length && this.getTags()

    if (this.$route.query.q) {
      this.getVectorsByTag(this.$route.query.q.split(','))
    } else {
      this.getVectors()
    }
  },
  computed: {
    ...mapGetters({
      filteredVectorsList: 'filteredVectorsList',
      searchTags: 'searchTags',
      tagsList: 'tagsList',
      loading: 'loading'
    }),
    downloadAllSvg () {
      const tags = this.searchTags.length
        ? this.searchTags.join()
        : 'all'
      return `https://cocomaterial.com/api/download/?tags=${tags}&img_format=svg`
    }
  },
  mounted: function () {
    window.addEventListener('scroll', () => {
      if ((window.innerHeight + window.scrollY) >= window.innerHeight * 1.5) {
        this.showScrollToTop = true
      } else {
        this.showScrollToTop = false
      }

      if (((window.innerHeight + window.scrollY) + (window.innerHeight / 3)) >= document.getElementById('coco-container').offsetHeight) {
        if (this.limitNumber <= this.filteredVectorsList.length) {
          this.limitNumber += 30
        }
      }
    })
  },
  methods: {
    ...mapActions({
      getTags: 'getTags',
      getVectorsByTag: 'getVectorByTag',
      getVectors: 'getVectors'
    }),
    ...mapMutations({
      clearFilteredVectors: 'clearFilteredVectors',
      updateSearchTags: 'updateSearchTags',
      removeSearchTag: 'removeSearchTag'
    }),
    showModal (vector, bulk, id) {
      this.selectedVector = vector
      // get svg code
      var xmlHttp = new XMLHttpRequest()
      xmlHttp.open('GET', vector.url, false)
      xmlHttp.send(null)

      const height = document.getElementById(`${id}`) && document.getElementById(`${id}`).clientHeight
      const width = document.getElementById(`${id}`) && document.getElementById(`${id}`).clientWidth

      this.isHorizontal = height < width
      this.svgCode = JSON.parse(xmlHttp.responseText).svg_content
      this.customizeBulk = bulk
      this.isModalVisible = true
    },
    closeModal () {
      this.isModalVisible = false
    },
    loaded (id) {
      const height = document.getElementById(`${id}`) && document.getElementById(`${id}`).clientHeight
      const width = document.getElementById(`${id}`) && document.getElementById(`${id}`).clientWidth
      if (document.getElementById(id)) {
        document.getElementById(id).className = height > width ? 'vertical' : 'horizontal'
      }
    },
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
      this.search = ''
      this.$refs.search.focus()
      this.autocompleteResults = []
      this.updateSearchTags(tag.toLocaleLowerCase())

      this.getVectorsByTag(this.searchTags)
      this.$router.push({ path: '/results', query: { q: this.searchTags.join(',') } })
    },
    removeTag (tag) {
      this.removeSearchTag(tag)
      if (this.searchTags.length) {
        this.getVectorsByTag(this.searchTags)
        this.$router.push({ path: '/results', query: { q: this.searchTags.join(',') } })
      } else {
        this.getVectors()
        this.$router.push({ path: '/results' })
      }
    },
    downloadSvg (vector) {
      const id = vector.id
      return `https://cocomaterial.com/api/download/?id=${id}&img_format=svg`
    },
    handleDownloadSvg (vector) {
      this.$matomo.trackEvent('downloads', 'svg', vector.name)
    },
    searchVector (search) {
      if (this.search !== '') {
        this.addTag(this.search.toLocaleLowerCase())
      }
      this.$router.push({ path: '/results', query: { q: search.toLocaleLowerCase() } })
      this.getVectorsByTag([search.toLocaleLowerCase()])
    },
    handleDelete () {
      if (this.search === '') {
        this.removeTag(this.searchTags.slice(-1).pop())
      }
    },
    scrollToTop () {
      window.scrollTo(
        { top: 0, behavior: 'smooth' }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/variables';

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0
  }

  .scroll-to-top {
    align-items: center;
    background: #7BDFF2;
    border: 0;
    border-radius: 100%;
    bottom: 1.5rem;
    display: flex;
    height: 50px;
    justify-content: center;
    right: 1.5rem;
    position: fixed;
    width: 50px;

    & img {
      height: 1rem;
      width: 1rem;
    }
  }

  .results {
    display: grid;
    grid-template-columns: 1fr 6fr;
    margin: 70px auto;
    max-width: 1440px;

    @media (max-width: 1500px) {
      margin: 0 20px;
    }

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }

  .search {
    display: flex;
    align-items: center;

    @media (max-width: 1200px) {
      margin-bottom: 10px;
    }

    @media (max-width: 768px) {
      align-items: flex-start;
      flex-direction: column;
      margin-bottom: 0;
    }

    & label {
      font-size: 18px;
      font-weight: 500;
      margin-right: 5px;

      @media (max-width: 768px) {
        font-size: 14px;
        margin-bottom: 10px;
      }
    }

      & .relative {
        position: relative;

        @media (max-width: 768px) {
          margin-bottom: 10px;
          width: 100%;
        }
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
         white-space: nowrap;

         &:hover {
           cursor: pointer;
         }
      }

      & input {
        background-color: transparent;
        border: none;
        height: 30px;
        font-size: 16px;
        width: 100%;

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
        width: calc(100% - 12px);

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

    & .info-text {
      color: $color-grey;
      font-size: 14px;

      @media (max-width: 768px) {
        font-size: 12px;
        margin-bottom: 10px;
      }
    }
  }

  .vectors-actions {
    width: 40%;
    text-align: right;

    @media (max-width: 1200px) {
      width: 100%;
    }
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
    color: $color-black;
    font: 500 14px 'Red Hat Display';
    text-decoration: none;
  }

  .menu {
    display: flex;
    justify-content: space-between;
    margin-bottom: 35px;

    @media (max-width: 1200px) {
      flex-direction: column;
    }
  }

  .tags {
    @media (max-width: 900px) {
      display: none;
    }
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

    & .popular-btn {
      background: none;
      border: none;
      font-weight: 500;
      font-size: 14px;
      font-family: 'Red Hat Display';
    }
  }

  .results-list {
    display: grid;
    grid-template-columns: repeat(5, 18%);
    column-gap: 3%;
    row-gap: 50px;

    @media (max-width: 1500px) {
      grid-template-columns: repeat(4, 22%);
    }

    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 49%);
      column-gap: 2%;
    }

    & .download-btn {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 10px;
    }

    & .btn {
      background-color: transparent;
      border: 2px solid $color-turquoise;
      border-radius: 4px;
      font-size: 14px;
      padding: 5px;
      transition: all ease .3s;

      &:hover {
        background-color: $color-turquoise;
        color: $color-white;
      }
    }

    & .svg {
      color: $color-black;
      font: 400 14px 'Red Hat Display';
      padding: 4px 5px;
      text-decoration: none;
      text-align: center;
    }

    & .img-container {
      border: 1px solid #F2F2F2;
      display: flex;
      height: 150px;
      margin-bottom: 10px;
      padding: 8% 16%;
    }

    & .svg-container {
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
      height: 100%;
      width: 100%;
    }

    & img, .svg-container {
      margin: auto;

      &.vertical {
        height: 125px;

        @media (max-width: 1200px) {
          height: 100px;
        }
      }

      &.horizontal {
        width: 125px;

        @media (max-width: 1200px) {
          width: 100px;
        }
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
