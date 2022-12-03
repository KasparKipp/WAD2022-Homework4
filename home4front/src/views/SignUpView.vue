<template>
    
    <div class="form-container">
    
    <div class="col">
        
       
      </div>
    <form @submit.prevent="onSubmit">
        
        <div class="form-group" :class="{ error: v$.form.email.$errors.length }">
      <label for="">Email  </label>
      <input class="form-control" placeholder="Enter your username" type="email" v-model="v$.form.email.$model">
      <div class="pre-icon os-icon os-icon-user-male-circle"></div>
          <!-- error message -->
      <div class="input-errors" v-for="(error, index) of v$.form.email.$errors" :key="index">
        <div class="error-msg">{{ error.$message }}</div>
      </div>
    </div>
        
        <div class="form-group" :class="{ error: v$.form.password.$errors.length }">
      <label for="">Password</label>
      <input class="form-control" placeholder="Enter your password" type="password" v-model="v$.form.password.$model">
      <div class="pre-icon os-icon os-icon-fingerprint"></div>
          <!-- error message -->
      <div class="input-errors" v-for="(error, index) of v$.form.password.$errors" :key="index">
        <div class="error-msg">{{ error.$message }}</div>
      </div>
    </div>
        <br> 
        
        
            <div class="buttons-w">
      <button :disabled="v$.form.$invalid" class="btn btn-primary">Login</button>
    </div>
        
        </form>
    <div class="col">
        <a href="#" style="color:blue" class="btn">Forgot password?</a>
        </div>
    </div>
  </template>
  
  <script>
  
  
  
  export default {
    name: 'SignUpView',
    components:{
      
    },
    props: {
      //msg: String
    },
    setup () {
    
  },

  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    }
  },
    
  validations() {
    return {
      form: {
        email: {
           required, email 
        },
        password: {
            required, 
            min: minLength(8),
            max: maxLength(15),
            containsPasswordRequirement: helpers.withMessage(
          () => `The password requires an uppercase`, 
          (value) => /(?=.*[A-Z])/.test(value)
        ),
        containsPasswordRequirement2: helpers.withMessage(
          () => `The password requires 2 lowercase charactes`, 
          (value) => /((?=.*[a-z].*[a-z]))/.test(value)
        ),
        containsPasswordRequirement3: helpers.withMessage(
          () => `The password must contain a number`, 
          (value) => /(?=.*[0-9])/.test(value)
        ),
        containsPasswordRequirement4: helpers.withMessage(
          () => `The password must contain "_" ` , 
          (value) => /(?=.*["_"])/.test(value)
        ),
        containsPasswordRequirement5: helpers.withMessage(
          () => `The password has to begin with an uppercase`, 
          (value) => /(?=.*[A-Z])/.test(value[0])
        ),
            
            
        },
      },
    }
  },
  
  
  }
  </script>
  

  <style scoped>
  .form-container {
  margin: 20px auto;
  display: block;
  width: 300px;
  text-align: center;
  background-color: lightgray;
  border-radius: 10px;
  padding: 10px;

}
  
  </style>