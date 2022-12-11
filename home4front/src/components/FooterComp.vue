<template>
    <footer>
        <p>Copyright &copy; 2021</p>
        <router-link to="#">About</router-link>
    </footer>
</template>

<script>
    export default {
        name: 'FooterComp'
    }
</script>

<style scoped>
footer{
  position: fixed;
  left: 0;
  bottom: 0;
  width: calc(100% - 20px);
  margin: 30px 5px 0px 5px;
  padding: 10px 0;
  background-color: darkgray;
  border-radius: 10px;
  text-align: center;
}
a {
    color: #333;
}
</style>