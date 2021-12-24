
<template src="./Home.html" lang="html"></template>
<style src="./Home.scss"  lang="scss" scoped></style>
<script>
import { mapActions, mapState, mapMutations } from 'vuex'

export default {
  name: 'Home',
  data () {
    return {
      vectors: null,
      search: '',
      tagsToSearch: [],
      autocompleteResults: [],
      showScrollToTop: false
    }
  },
  computed: {
    ...mapState('home', {
      featuredVectors: state => state.featuredVectors,
      latestVectors: state => state.latestVectors
    }),
    ...mapState('tags', {
      tags: state => state.tags
    })
  },
  beforeMount () {
    this.clearSearchTags()
    this.getTags()
    this.getFeaturedVectors()
    this.getLatestVectors()
  },
  mounted () {
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
      getFeaturedVectors: 'home/getFeaturedVectors',
      getLatestVectors: 'home/getLatestVectors',
      getTags: 'tags/getTags'
    }),
    ...mapMutations({
      clearSearchTags: 'tags/clearSearchTags'
    }),
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
    resetAutocompleteResults () {
      this.autocompleteResults = []
      document.getElementById('search').focus()
    },
    closeAutocomplete () {
      this.autocompleteResults = []
    },
    addTag (tag) {
      this.tagsToSearch.push(tag.toLocaleLowerCase())
      this.search = ''
      this.$refs.search.focus()
      this.autocompleteResults = []
    },
    removeTag (tag) {
      const index = this.tagsToSearch.findIndex(it => it === tag)
      this.tagsToSearch.splice(index, 1)
    },
    searchVector () {
      if (this.search !== '') {
        this.addTag(this.search.toLocaleLowerCase())
      }
      this.$router.push({ path: '/results', query: { q: this.tagsToSearch.join(',') } })
    },
    searchVectorByTopic (search, vectorId, ordering) {
      const query = {}

      if (search) {
        query.q = search.toLocaleLowerCase()
      }

      if (vectorId) {
        query.vectorId = vectorId
      }

      if (ordering) {
        query.ordering = ordering
      }

      this.$router.push({ path: '/results', query })
    },
    handleDelete () {
      if (this.search === '') {
        this.removeTag(this.tagsToSearch.slice(-1).pop())
      }
    },
    tagsSeparator (tags) {
      return tags.replace(/\s/g, '').split(',')
    },
    scrollToTop () {
      window.scrollTo(
        { top: 0, behavior: 'smooth' }
      )
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
