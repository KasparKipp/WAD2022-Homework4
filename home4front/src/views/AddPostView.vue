<template>
  <div class="form">
    <h3>Add a post</h3>
    <label for="body">Write your post</label>
    <input type="text" name="body"  required v-model="body">
    <label for="password">Add a picture URL</label>
    <input type="url" name="image_url" required v-model="img">
    <div class="container">
      <button @click="Post"  class="center">Post</button>
      <button @click='this.$router.push("/")' class="center">Go back</button>
    </div>
  </div>
</template>

<script>
export default {
name: "AddPostView", 

data: function() {
    return {
   img: '',
   body: '',
  }
  },
  methods: {
Post() {
      var data = {
        img: this.img,
        body: this.body
      };
      // using Fetch - post method - send an HTTP post request to the specified URI with the defined body
      fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
          credentials: 'include', //  Don't forget to specify this if you need cookies
          body: JSON.stringify(data),
      })
      .then((response) => response.json())
      .then((data) => {
      console.log("Postitamisest saadud data on: ", data);
      //this.$router.push("/");
      location.assign("/");
      })
      .catch((e) => {
        console.log(e);
        console.log("error");
      });
    },
  }, 
  }

</script>

<style scoped>
.form {
  max-width: 420px;
  margin: 30px auto 400px;
  background: rgb(167, 154, 154);
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}
h3 {
  text-align: center;
  color: rgb(8, 110, 110);
}
label {
  color: rgb(8, 110, 110);
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.8em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
input {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid white;
  color: blue;
}
button {
  background: rgb(8, 110, 110);
  border: 0;
  padding: 10px 20px;
  margin: 20px 20px 20px 20px;
  color: white;
  border-radius: 20px;
  align-items: center;
  text-align: center;
}
.center {
  margin: auto;
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  width: 30%; 
}
.container {
  display: flex;
  justify-content: center;
}
</style>