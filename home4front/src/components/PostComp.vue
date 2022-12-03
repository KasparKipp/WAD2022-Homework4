<template>
  <!-- Creating Posts, (v-for="post in posts"): goes through every available posts data -->
  <div :key="post.id" v-for="post in posts" class="user-post">
    <div class="user-post-header">
      <!-- Adding profile picture -->
      <img
          :src="[post.profile === '' ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiXiGmEyNs2kbk30k1E3aH2ezJT-MUV5ouDy-ESy6WqFYMwdbk' : post.profile ]"
          width="25" height="25"
          alt="User profile picture"
      />

      <p>{{ post.date }}</p>

      <div id="myData"></div>
    </div>
    <br>
    <div v-if="!(post.img === '')" class="post-image">
      <img :src="post.img" alt="Post image">
    </div>
    <br>

    <div class="user-post-footer">
      <p>{{ post.body }}</p>
    </div>

    <div class="like-button">
      <button
          @click="like(post)"
          style="background-color:darkgrey;border:none">
        <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Facebook_Thumb_icon.svg/1200px-Facebook_Thumb_icon.svg.png"
            width="25" height="25" alt="Like button"/>
        <p>{{ post.likes }} likes</p>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostComp",
  computed: {
    posts() {
      return this.$store.state.posts
    },
  },
  methods: {
    like(post) {
      this.$store.commit('like', post.id)
    },
  },
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
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

@media screen and (max-width: 600px) {
  .user-post {
    flex: 0 1 48%;
  }
}

.user-post-header {
  position: relative;
  padding: 5px;
}

.user-post-header img {
  float: left;
  border-radius: 50%;
}

.user-post-header p {
  float: right;
}

.post-image img {
  height: 200px;
}

.user-post-footer {
  width: auto;
}

.like-button {
  width: auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  background-color: darkgray;
  border-radius: 10px;
  padding: 5px 2px;
}

img + p:hover {
  color: red;
}
</style>