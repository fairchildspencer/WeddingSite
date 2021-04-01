<template>
  <div id="app">
    <div id="nav">
      <h1 class="main-title">J+S</h1>
      <router-link to="/">Home</router-link> |
      <router-link to="/registry">Registry</router-link> |
      <router-link to="/reserved">Reserved</router-link> |
      <router-link to="/allAddresses">All Addresses</router-link>
    </div>
    <router-view/>
    <div class="footer">
      <a href="https://github.com/fairchildspencer/CS260/tree/master/wedding-site">Github</a>
    </div>
  </div>
</template>

<style>

html {
  margin:0;
  padding:0;
  width:100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
}

#nav {
  padding:1rem;
  padding-bottom: 4rem;
  background-color: #2b3641;
  color:whitesmoke;
  width:100%;
}

#nav a{
  font-weight: bold;
  color: whitesmoke;
}

.main-title {
    font-weight: bold;
    color: whitesmoke;
}

#nav a.router-link-exact-active {
  color: #eab5f3;
}

.footer {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 0.5rem;
  width:100%;
  border-top: 3px solid #2b3641;
  margin-top:2rem;

  position: relative;
  margin-top: -2rem;
  /* negative value of footer height */
  height: 2rem;
  clear: both;
}
</style>
