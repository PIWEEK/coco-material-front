<template>
  <div id="app">
    <div>
      <div class="nav">
        <router-link to="/">
          <img alt="CocoMaterial logo. Coconut with a straw inside" src="./assets/logo.svg">
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
            <a href="#piweek">A PiWEEK Project</a>
          </span>
        </div>
      </div>
      <router-view/>
    </div>
    <footer :style="{ backgroundImage: 'url(' + require('@/assets/waves.svg') + ')' }">
      <div class="left-side">
        <img alt="Palm tree illustration" src="./assets/palm-tree.svg">
        <ul class="menu-list">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/team">The team</router-link></li>
          <li><a href="#piweek">A PiWEEK Project</a></li>
        </ul>
      </div>
      <span class="text">Free for commercial and personal use under ¿?? License | Cocomaterial © 2020 | Made with &lt;3 and open source</span>
    </footer>
  </div>
</template>

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
  margin: 20px 70px;

  & a {
    margin: 0;
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

footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 30px 60px;
  background-size: cover;
  background-repeat: no-repeat;

  & .left-side {
    display: flex;
    align-items: flex-end;
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

.preview {
  svg {
    width: 200px;
  }
}

</style>
