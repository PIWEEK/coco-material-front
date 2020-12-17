
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
  beforeMount () {
    this.getTags()
    this.clearSearchTags()
    this.getFeaturedVectors()
    this.getLatestVectors()
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
  computed: {
    ...mapState({
      tags: 'tags',
      featuredVectors: 'featuredVectors',
      latestVectors: 'latestVectors'
    })
  },
  methods: {
    ...mapActions({
      getTags: 'getTags',
      getFeaturedVectors: 'getFeaturedVectors',
      getLatestVectors: 'getLatestVectors'
    }),
    ...mapMutations({
      clearSearchTags: 'clearSearchTags'
    }),
    autocompleteSearch () {
      this.autocompleteResults = this.tags.filter(it => it.slug.includes(this.search.toLocaleLowerCase()))
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
    resetAutocompleteResults () {
      this.autocompleteResults = []
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
    searchVectorByTopic (search) {
      this.$router.push({ path: '/results', query: { q: search.toLocaleLowerCase() } })
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
    }
  }
}
</script>
