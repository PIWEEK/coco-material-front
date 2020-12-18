<template src="./Results.html" lang="html"></template>
<style src="./Results.scss"  lang="scss" scoped></style>
<script>

import { mapState, mapActions, mapMutations } from 'vuex'
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
      showScrollToTop: false,
      currentPage: 1,
      pageSize: 40
    }
  },
  beforeMount () {
    !this.searchTags.length && this.getTags()

    if (this.$route.query.q) {
      this.getVectorsByTag({
        tags: this.$route.query.q.split(','),
        currentPage: this.currentPage,
        pageSize: this.pageSize
      })
    } else {
      this.getVectors({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      })
    }
  },
  computed: {
    ...mapState({
      filteredVectors: 'filteredVectors',
      searchTags: 'searchTags',
      tags: 'tags',
      loading: 'loading',
      totalResults: 'totalResults',
      paginationArray: 'paginationArray'
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
      removeSearchTag: 'removeSearchTag',
      clearSearchTags: 'clearSearchTags'
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
      this.svgCode = JSON.parse(xmlHttp.responseText).svg_content
      this.customizeBulk = bulk
      this.isModalVisible = true
    },
    closeModal () {
      this.isModalVisible = false
    },
    resetAutocompleteResults () {
      this.autocompleteResults = []
      document.getElementById('search').focus()
    },
    loaded (id) {
      const image = new Image()
      image.src = window.getComputedStyle(document.getElementById(`${id}`), false).backgroundImage.slice(4, -1).replace(/"/g, '')
      const height = image.height
      const width = image.width
      document.getElementById(id).className = height > width ? 'vertical' : 'horizontal'
    },
    autocompleteSearch () {
      this.autocompleteResults = this.tags.filter(it => it.slug.includes(this.search.toLocaleLowerCase()))
    },
    focusAutocompleteResults (index, key) {
      event.stopPropagation()
      event.preventDefault()
      let topPos
      let elementHeight
      let element
      if (this.autocompleteResults.length) {
        if (key === 'down') {
          element = document.querySelectorAll('#results span')[index + 1]
          topPos = element.offsetTop
          elementHeight = element.clientHeight
          document.querySelector('#results').scrollTop = topPos - elementHeight
          element.focus({ preventScroll: true })
          if (index === -1) {
            setTimeout(() => {
              document.querySelector('#results').scrollTop = 0
            }, 100)
          }
        } else if (key === 'up' && index === 0) {
          document.querySelector('#search').focus()
        } else {
          element = document.querySelectorAll('#results span')[index - 1]
          topPos = element.offsetTop
          elementHeight = element.clientHeight
          document.querySelector('#results').scrollTop = topPos - elementHeight
          element.focus({ preventScroll: true })
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

      this.getVectorsByTag({
        tags: this.searchTags,
        currentPage: 1,
        pageSize: this.pageSize
      })
      this.$router.push({ path: '/results', query: { q: this.searchTags.join(',') } })
    },
    removeTag (tag) {
      this.removeSearchTag(tag)
      if (this.searchTags.length) {
        this.getVectorsByTag({
          tags: this.searchTags,
          currentPage: 1,
          pageSize: this.pageSize
        })
        this.$router.push({ path: '/results', query: { q: this.searchTags.join(',') } })
      } else {
        this.getVectors({
          currentPage: this.currentPage,
          pageSize: this.pageSize
        })
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
      const searchValue = typeof search === 'string' ? search : this.search
      if (searchValue !== '') {
        this.addTag(searchValue.toLocaleLowerCase())
      }
      this.$router.push({ path: '/results', query: { q: searchValue.toLocaleLowerCase() } })
      this.getVectorsByTag({
        tags: [searchValue.toLocaleLowerCase()],
        currentPage: 1,
        pageSize: this.pageSize
      })
    },
    searchModalVector (tag) {
      this.clearSearchTags()
      this.updateSearchTags(tag.replace(/\s/g, ''))
      this.getVectorsByTag({
        tags: this.searchTags,
        currentPage: 1,
        pageSize: this.pageSize
      })
      this.$router.push({ path: '/results', query: { q: this.searchTags.join(',') } })
      this.isModalVisible = false
    },
    showAll () {
      this.clearSearchTags()
      this.getVectors({
        currentPage: 1,
        pageSize: this.pageSize
      })
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
    },
    handlePagination (page) {
      this.currentPage = page
      if (this.searchTags.length) {
        this.getVectorsByTag({
          tags: this.searchTags,
          currentPage: page,
          pageSize: this.pageSize
        })
      } else {
        this.getVectors({
          currentPage: page,
          pageSize: this.pageSize
        })
      }
      this.scrollToTop()
    }
  }
}
</script>
