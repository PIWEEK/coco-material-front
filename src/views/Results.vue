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
        <div class="search">
          <label for="search">Search results for: </label>
          <input id="search" v-model="search" type="text" @keyup.enter="searchIcon"/>
          <span v-if="filteredVectorsList.length" class="info-text">Showing {{filteredVectorsList.length}} results</span >
        </div>
        <div  v-if="filteredVectorsList.length" class="vectors-actions">
          <button class="btn-color">
            <img src="../assets/palette.svg" />
            <span>Customize all</span></button>
          <button class="btn-download">Download all SVG</button>
        </div>
      </div>
      <div v-if="filteredVectorsList.length" class="results-list">
        <span class="vector-container" v-for="(vector, index) in filteredVectorsList" :key="index">
          <img :src="vector.svg" />
          <div class="download-btn">
            <button class="btn svg">SVG</button>
            <button class="btn png" @click="showModal">PNG</button>
          </div>
        </span>
      </div>
      <div v-else class="no-results">
        <img src="../assets/coco.svg" />
        <h3>Sorry, this coconut is empty</h3>
        <p>We didn't find any result matching "".</p>
        <p>Please try a different search term or look within our <strong>popular tags</strong></p>
      </div>
    </section>
    <modal
      v-show="isModalVisible"
      @close="closeModal"
    />
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import modal from '../components/modal/modal.vue'

export default {
  name: 'Results',
  components: {
    modal
  },
  data () {
    return {
      search: '',
      isModalVisible: false
    }
  },
  computed: {
    ...mapGetters({
      filteredVectorsList: 'filteredVectorsList'
    })
  },
  methods: {
    showModal () {
      this.isModalVisible = true
    },
    closeModal () {
      this.isModalVisible = false
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
    width: 64%;

    & label {
      font-size: 18px;
      font-weight: 500;
      margin-right: 5px;
    }

    & input {
      border-radius: 3px;
      border: 1px solid #C4C4C4;
      margin-right: 10px;
      padding: 5px 0;
      width: 50%;
    }

    & .info-text {
      color: $color-grey;
      font-size: 14px;
    }
  }

  .vectors-actions {
    width: 36%;
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
    column-gap: 20px;

    & .download-btn {
      width: 100%;
    }

    & .btn {
      background-color: transparent;
      border: 2px solid $color-turquoise;
      border-radius: 4px;
      padding: 5px;
      width: 46%;
    }

    & .svg {
      margin-right: 8%;
    }

    & img {
      border: 1px solid #F2F2F2;
      margin-bottom: 10px;
      padding: 8%;
      width: 84%;
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
  }

</style>
