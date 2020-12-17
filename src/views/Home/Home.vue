
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
      autocompleteResults: []
    }
  },
  beforeMount () {
    this.getTags()
    this.clearSearchTags()
    this.getFeaturedVectors()
  },
  computed: {
    ...mapState({
      tags: 'tags',
      featuredVectors: 'featuredVectors'
    })
  },
  methods: {
    ...mapActions({
      getTags: 'getTags',
      getFeaturedVectors: 'getFeaturedVectors'
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
    }
  }
}
</script>
