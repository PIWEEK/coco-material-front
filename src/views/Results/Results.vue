<template src="./Results.html" lang="html"></template>
<style src="./Results.scss"  lang="scss" scoped></style>
<script>

import { mapGetters, mapActions, mapMutations } from 'vuex'
import modal from '../../components/modal/modal.vue'

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
      showScrollToTop: false,
      svgOriginalWidth: null
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

      const image = new Image()
      image.src = window.getComputedStyle(document.getElementById(`${id}`), false).backgroundImage.slice(4, -1).replace(/"/g, '')
      const height = image.height
      const width = image.width
      this.isHorizontal = height < width
      this.svgOriginalWidth = width
      this.svgCode = JSON.parse(xmlHttp.responseText).svg_content
      this.customizeBulk = bulk
      this.isModalVisible = true
    },
    closeModal () {
      this.isModalVisible = false
    },
    loaded (id) {
      const image = new Image()
      image.src = window.getComputedStyle(document.getElementById(`${id}`), false).backgroundImage.slice(4, -1).replace(/"/g, '')
      const height = image.height
      const width = image.width
      document.getElementById(id).className = height > width ? 'vertical' : 'horizontal'
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
