<template>
  <div id="app">
    <div>
      <div class="nav">
        <router-link to="/">
          <img class="logo" alt="CocoMaterial logo. Coconut with a straw inside" src="./assets/logo.svg">
        </router-link>
        <div class="nav-links">
          <span class="link">
            <router-link to="/">Home</router-link>
          </span>
          <span class="separator">
            <img alt="Menu separator" src="./assets/dot.png">
          </span>
          <span class="link">
            <router-link to="/team">The team</router-link>
          </span>
          <span class="separator">
            <img alt="Menu separator" src="./assets/dot.png">
          </span>
          <span class="link">
            <router-link to="/license">License</router-link>
          </span>
        </div>
        <button @click="openNav" :class="`menu-btn ${navOpen ? 'open' : ''}`">
          <img src="./assets/menu.svg" alt="Menu mobile" />
        </button>
      </div>
      <router-view/>
    </div>
    <div :class="`side-nav ${navOpen ? 'open' : ''}`">
      <div class="header">
        <img class="logo" alt="CocoMaterial logo. Coconut with a straw inside" src="./assets/logo.svg">
        <button @click="openNav" :class="`menu-btn ${navOpen ? 'open' : ''}`">
          <img src="./assets/close2.svg" alt="Close" />
        </button>
      </div>
      <div class="nav-links">
        <span class="link" @click="openNav">
          <router-link to="/">Home</router-link>
        </span>
        <span class="separator">
          <img alt="Menu separator" src="./assets/dot.png">
        </span>
        <span class="link" @click="openNav">
          <router-link to="/team">The team</router-link>
        </span>
        <span class="separator">
          <img alt="Menu separator" src="./assets/dot.png">
        </span>
        <span class="link" @click="openNav">
          <router-link to="/license">License</router-link>
        </span>
      </div>
    </div>
    <footer :style="{ backgroundImage: 'url(' + require('@/assets/waves.svg') + ')' }">
      <div class="inner-footer">
        <div class="left-side">
          <img alt="Palm tree illustration" src="./assets/palm-tree.svg">
          <ul class="menu-list">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/team">The team</router-link></li>
            <li><router-link to="/license">License</router-link></li>
          </ul>
        </div>
        <span class="text">Cocomaterial © 2020 | Made with &lt;3 and open source</span>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      navOpen: false
    }
  },
  methods: {
    openNav () {
      this.navOpen = !this.navOpen
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400;500;700&display=swap');
@import '@/variables';

html,
body {
  height: 100%;
}

body {
  font-family: 'Red Hat Display', sans-serif;
  margin: 0;
}

#app {
  font-family: 'Red Hat Display', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $color-black;
  font-weight: 400;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

button:hover {
  cursor: pointer;
}

.nav {
  display: grid;
  grid-template-columns: 128px 1fr;
  margin: 20px auto;
  max-width: 1440px;

  @media (max-width: 1440px) {
    margin: 20px;
  }

  & a {
    margin: 0;
  }

  & .nav-links {
    @media (max-width: 768px) {
      display: none;
    }
  }

  .menu-btn {
    display: none;

    @media (max-width: 768px) {
      display: block;
      justify-self: flex-end;
      align-self: center;
      margin-right: 20px;
    }
  }

  & .logo {
    @media (max-width: 768px) {
      height: 50px;
    }
  }
}

.nav-links {
  display: flex;
  justify-content: flex-end;
  margin: auto 0;

  & a {
    color: $color-grey;
    font-size: 14px;
    font-weight: 700;
    margin: 0 15px;
    text-decoration: none;
    text-transform: uppercase;

    &:hover {
      color: $color-turquoise;
    }
  }
}

.menu-btn {
  background-color: transparent;
  border: none;
  width: 35px;
  height: 30px;
}

.side-nav {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  right: 0;
  background-color: $color-white;
  overflow-x: hidden;
  transition: 0.5s;

  &.open {
    width: 100%;
  }

  & .header {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  & .logo {
    height: 50px;
  }

  & .nav-links {
    flex-direction: column;
    text-align: center;
    margin-top: 100px;
  }

  & .link,
  & .separator {
    margin-bottom: 20px;
  }
}

footer {

  background-size: cover;
  background-repeat: no-repeat;
  & .inner-footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 30px 60px;
    margin:0 auto;
    max-width: 1440px;

    @media (max-width: 768px) {
      display: block;
      padding: 20px;
    }

    & .left-side {
      display: flex;
      align-items: flex-end;

      @media (max-width: 768px) {
        justify-content: center;
        margin-bottom: 50px;
      }
    }

    & .menu-list {
      list-style-type: none;
      margin: 0;

      & li {
        margin-top: 15px;
      }
    }

    & a{
      color: $color-black;
      font-size: 14px;
      font-weight: 700;
      margin-top: 15px;
      text-decoration: none;
    }

    & .text {
      color: $color-black;
      font-size: 14px;
      font-weight: 500;
    }
  }
}

.preview {

  &.horizontal {
    svg {
      width: 200px;

      @media (max-width: 768px) {
        width: 180px;
      }
    }
  }

  &.vertical {
    svg {
      height: 200px;

      @media (max-width: 768px) {
        height: 160px;
      }
    }
  }
}

</style>
