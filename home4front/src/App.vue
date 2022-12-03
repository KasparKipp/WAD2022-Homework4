<template>
  <HeaderComp />
  <router-view />
  <FooterComp />
</template>

<script>
import HeaderComp from './components/HeaderComp.vue';
import FooterComp from './components/FooterComp.vue';
export default {
  name: 'App',
  components: {
    HeaderComp,
    FooterComp
  },
  data() {
    return {
      
    }
  },
  methods: {

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>

