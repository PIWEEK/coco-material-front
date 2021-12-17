<template src="./Results.html" lang="html"></template>
<style src="./Results.scss"  lang="scss" scoped></style>
<script>

import { mapState, mapActions, mapMutations } from 'vuex'
import modal from '@/components/modal/modal.vue'

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
      pageSize: 40,
      showNavBar: false,
      mobileView: false
    }
  },
  async beforeMount () {
    !this.searchTags.length && this.getTags()

    const payload = {
      currentPage: this.currentPage,
      pageSize: this.pageSize,
      ordering: this.$route.query.ordering
    }

    if (this.$route.query.q) {
      payload.tags = this.$route.query.q.split(',')
    }

    await this.getVectors(payload)

    // Open the vector detail modal if there is a vectorId
    if (this.$route.query.vectorId) {
      // Use strings in the comparation because they could be numbers or strings
      const index = this.filteredVectors.findIndex((v) => `${v.id}` === `${this.$route.query.vectorId}`)
      if (index !== -1) {
        const vector = this.filteredVectors[index]
        this.showModal(vector, false, index)
      }
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
    })
  },
  mounted: function () {
    window.addEventListener('scroll', () => {
      if ((window.innerHeight + window.scrollY) >= window.innerHeight * 1.5) {
        this.showScrollToTop = true
      } else {
        this.showScrollToTop = false
      }

      const formSearchEl = document.getElementById('formSearch')
      if (formSearchEl) {
        const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
        this.showNavBar = currentScrollPosition > (formSearchEl.offsetTop + 30)
        this.mobileView = window.innerWidth < 768
      }
    })
  },
  methods: {
    ...mapActions({
      getTags: 'getTags',
      getVectorsByTags: 'getVectorsByTags',
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
      const image = new Image()
      image.src = window.getComputedStyle(document.getElementById(`${id}`), false).backgroundImage.slice(4, -1).replace(/"/g, '')
      const height = image.height
      const width = image.width
      this.isHorizontal = height < width
      this.customizeBulk = bulk

      this.isModalVisible = true
    },
    closeModal () {
      this.selectedVector = null
      this.isHorizontal = true
      this.customizeBulk = false

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
      this.$refs.search && this.$refs.search.focus()
      this.autocompleteResults = []
      this.updateSearchTags(tag.toLocaleLowerCase())

      this.getVectorsByTags({
        tags: this.searchTags,
        currentPage: 1,
        pageSize: this.pageSize
      })
      this.$router.push({ path: '/results', query: { q: this.searchTags.join(',') } })
    },
    removeTag (tag) {
      this.removeSearchTag(tag)
      if (this.searchTags.length) {
        this.getVectorsByTags({
          tags: this.searchTags,
          currentPage: 1,
          pageSize: this.pageSize,
          ordering: this.$route.query.ordering
        })
        this.$router.push({ path: '/results', query: { q: this.searchTags.join(',') } })
      } else {
        this.getVectors({
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          ordering: this.$route.query.ordering
        })
        this.$router.push({ path: '/results' })
      }
    },
    async downloadAll () {
      const tags = this.searchTags.length
        ? this.searchTags.join()
        : 'all'

      const queryUrl = new URLSearchParams()
      queryUrl.set('suggested', true)
      queryUrl.set('tags', tags)
      queryUrl.set('img_format', 'both')
      window.open(`${process.env.VUE_APP_API_URL}/download/?${queryUrl.toString()}`, '_blank')
    },
    async download (vector) {
      const queryUrl = new URLSearchParams()
      queryUrl.set('suggested', true)
      queryUrl.set('id', vector.id)
      queryUrl.set('img_format', 'both')
      window.open(`${process.env.VUE_APP_API_URL}/download/?${queryUrl.toString()}`, '_blank')
    },
    trackDownload (vector) {
      if (this.$matomo) {
        this.$matomo.trackEvent('downloads', 'svg', vector.name)
      }
    },
    searchVector (search) {
      const searchValues = typeof search === 'string' ? search.toLocaleLowerCase() : this.search.toLocaleLowerCase()

      for (const searchValue of searchValues.split(',')) {
        const val = searchValue.trim()
        if (val !== '') {
          this.addTag(val)
        }
      }
    },
    handleSearchVector (search) {
      this.clearSearchTags()
      this.addTag(search.toLocaleLowerCase())
    },
    searchModalVector (tag) {
      this.clearSearchTags()
      this.updateSearchTags(tag.replace(/\s/g, ''))
      this.getVectorsByTags({
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
        pageSize: this.pageSize,
        ordering: this.$route.query.ordering
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
        this.getVectorsByTags({
          tags: this.searchTags,
          currentPage: page,
          pageSize: this.pageSize,
          ordering: this.$route.query.ordering
        })
      } else {
        this.getVectors({
          currentPage: page,
          pageSize: this.pageSize,
          ordering: this.$route.query.ordering
        })
      }
      this.scrollToTop()
    },
    getSvgImageAsStyleAttr (vector) {
      var svg64 = window.btoa(vector.coloredSvgContent || vector.svgContent)
      return {
        backgroundImage: `url('data:image/svg+xml;base64,${svg64}')`
      }
    }
  }
}
</script>
