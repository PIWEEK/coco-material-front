<template>
  <div id="app">
    <div class="nav">
      <img alt="Vue logo" src="./assets/logo.jpg">
      <div class="nav-links">
        <span class="link">
          <router-link to="/">Home</router-link>
        </span>
        <span class="link"><router-link to="/about">About Us</router-link></span>
        <span class="link"><router-link to="/piweek">A PiWEEK Project</router-link></span>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.nav {
  display: grid;
  grid-template-columns: 128px 1fr;
}

.nav-links {
  display: flex;
  justify-content: space-around;
  margin: auto;
  width: 100%;
}

a {
  text-decoration: none;
  padding: 10;

  &:hover {
    color: red;
  }
}

</style>
