<template>
  <section class="content-area">
    <div class="left">
      
    </div>
    <div class="centerdiv">
      <!-- Posts start -->
      <div class="posts">
      <div class="buttons2">
        <div class="buttons">
          <ButtonComp
            v-if = "authResult"
            @clicked="Logout" 
            :text="'Logout'" 
          />
          <ButtonComp
            v-if = "authResult"
            @clicked="AddPost" 
            :text="'Add a post'"
          />
        </div>
      </div>
      
 
      
        <h1 v-if = "posts.length == 0">Go ahead and add some posts!</h1>
        <!-- Inserting posts from ThePost components -->
        <div :key="post.id" v-for="post in posts" class="user-post" >
          <PostComp  :post="post"></PostComp>
        </div>

        <!--<PostComp :posts="posts"></PostComp>-->

        <div class="buttons2">
          <!-- Like reset button -->
          <div class="reset-button">
            <button @click="deleteAll()">Delete all posts</button>
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
import auth from '../auth/index'
import ButtonComp from '../components/ButtonComp.vue'

export default {
  name: 'HomeView',
  components: {
    PostComp,
    ButtonComp,
  },
  data: function() {
    return {
    posts:[ ],
    authResult: false,
    }
  },
  methods: {
    deleteAll() {
      this.posts = []
      fetch("http://localhost:3000/posts", {
        method: "DELETE",
        credentials: 'include',
      })
      .then((response) => response.json())
      .catch((e) => {
        console.log(e);
        console.log("error");
      });
    },
    openPostview(id) {
      console.log("Opening post view for post: ", id)
      this.$router.push(`/post/${id}`)
    },
    AddPost() {
      this.$router.push("/addpost")
    },
    Logout() {
      fetch("http://localhost:3000/auth/logout", {
          credentials: 'include', //  Don't forget to specify this if you need cookies
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log('jwt removed');
        this.posts = []
        //console.log('jwt removed:' + auth.authenticated());
        this.$router.push("/login");
        //location.assign("/");
      })
      .catch((e) => {
        console.log(e);
        console.log("error logout");
      })
    },
  },
  async created() {
        // Ask db for posts
        await fetch('http://localhost:3000/posts', {
          credentials: 'include',
        })
        .then((response) => response.json())
        .then(data => {
          /*
          this.$store.state.posts = []
          console.log("DATA: \n", data)
          console.log("DATAROWS: \n", data.posts.rows)
          console.log("Store posts: \n", this.$store.state.posts)
          this.$store.state.posts = data.posts.rows
          console.log("Store posts: \n", this.$store.state.posts)
          */
          this.posts =  data.posts.rows
          this.authResult = auth.authenticated()
          console.log("Created posts: ", this.posts)
        })
        .catch(err => console.log(err.message))
    },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.posts {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
}
.buttons {
  margin: 0 auto;
  display: block;
}

.user-post {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  width: 80%;
  min-width: fit-content;
  max-width: 500px;
  height: auto;
  margin-top: 5px;
  background-color: darkgray;
  border-radius: 10px;
  padding: 5px 2px;
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
  padding-bottom: 60px;
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
.buttons2 {
  
  width: 300px;
  max-width: 400px;
  height: auto;
  margin-top: 5px;
  background-color: white;
  border-radius: 10px;
  padding: 5px 2px;

  flex: 0 1 99%;

}

@media screen and (max-width: 600px) {
  .user-post {
    flex: 0 1 48%;
  }
}
</style>