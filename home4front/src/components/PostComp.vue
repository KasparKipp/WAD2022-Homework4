<template>
  <div @dblclick="openPostview(post.id)">
    <div class="user-post-header">
      <!-- Adding profile picture -->
      <img
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiXiGmEyNs2kbk30k1E3aH2ezJT-MUV5ouDy-ESy6WqFYMwdbk'
          width="25" height="25"
          alt="User profile picture"
      />

      <p>{{ new Date(post.postdate.slice(0, -2)).toDateString() }}</p>

      <div id="myData"></div>
    </div>
    <br>
    <div v-show="imgloaded" class="post-image">
      <img :src="post.img" @load="onImgLoad" alt="Post image">
    </div>
    <br>

    <div class="user-post-footer">
      <p>{{ post.body }}</p>
    </div>

    </div>
</template>

<script>
export default {
  name: "PostComp",
  props: {
    post: Object,
  },
  data () {
    return {
      imgloaded: false
    }
  },
  methods: {
  openPostview(id) {
    console.log("Opening post view for post: ", id)
    this.$router.push(`/post/${id}`)
  },
  onImgLoad() {
    this.imgloaded = true
  }
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