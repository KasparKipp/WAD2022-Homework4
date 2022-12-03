<template>
  <section class="content-area">
    <div class="left">
    </div>
    <div class="centerdiv">

      <!-- Posts start -->
      <div class="posts">

        <!-- Inserting posts from ThePost components -->
        <PostComp :post="post"></PostComp>

        <div class="user-post">
          <!-- Like reset button -->
          <div class="reset-button">
            <button @click="reset()"> Reset Likes</button>
          </div>
          <br>
          <br>
          <br>
        </div>
      </div>

      <!-- Posts end -->
    </div>
    <br>
    <div class="right"></div>
  </section>
</template>


<script>
import PostComp from '../components/PostComp.vue';

export default {
  name: 'HomeView',
  components: {
    PostComp,
  },
  props: {
    msg: String
  },
  methods: {
    reset() {
      this.$store.commit('reset')
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.posts {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
}

.user-post {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  width: 300px;
  max-width: 400px;
  height: auto;
  margin-top: 5px;
  background-color: darkgray;
  border-radius: 10px;
  padding: 5px 2px;
  flex: 0 1 99%;
}

.left {
  margin-top: 5px;
  grid-area: leftside;
  background-color: darkgray;
  border-radius: 10px;
}

.centerdiv {
  grid-area: center;
  border-radius: 10px;
  margin-bottom: 25px;
}

.reset-button {
  margin: 0 auto;
  display: block;
}

.right {
  margin-top: 5px;
  grid-area: rightside;
  background-color: darkgray;
  border-radius: 10px;
}

.content-area {
  display: grid;
  grid-template-areas: 'leftside center center center rightside';
  grid-template-columns: 20% 1fr 1fr 1fr 20%;
  gap: 10px;
  width: calc(100% - 10px);
}
</style>