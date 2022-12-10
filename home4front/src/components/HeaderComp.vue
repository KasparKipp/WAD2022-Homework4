<template>
    <header>
        <h2>Welcome to our Social network</h2>
        <p>We are going to be bigger than est.social btw</p>
        <nav>
            <router-link to="/">Home</router-link> |
            <router-link to="/contacts">Contacts</router-link>
        </nav>
    </header>
    
</template>

export default {
    name: 'HeaderComp'
}

<style scoped>
header {
  width: calc(100vw - 45px);
  margin: 5px 5px 0 0px;
  background-color: darkgray;
  overflow: auto;
  padding: 0 10px;
  border-radius: 10px;
  font-size: x-large;
}

nav {
  margin-bottom: 10px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: blue;
}
</style>