<template>
<div>
<h2>Login or Create an Account</h2>
<div class="wrapper">
  <div class="wrapperBox">
    <form >
      <fieldset>
        <legend>Register</legend>
        <input placeholder="first name" v-model="firstName">
        <input placeholder="last name" v-model="lastName">
      </fieldset>
      <fieldset>
        <input placeholder="username" v-model="username">
        <input type="password" placeholder="password" v-model="password">
      </fieldset>
      <fieldset>
        <button type="submit" class="buttons" @click.prevent="register">Register</button>
      </fieldset>
    </form>
    <p v-if="error" class="error">{{error}}</p>
    <form class="pure-form space-above">
      <fieldset>
        <legend>Login</legend>
        <input placeholder="username" v-model="usernameLogin">
        <input type="password" placeholder="password" v-model="passwordLogin">
      </fieldset>
      <fieldset>
        <button type="submit" class="buttons" @click.prevent="login">Login</button>
      </fieldset>
    </form>
    <p v-if="errorLogin" class="error">{{errorLogin}}</p>
  </div>
</div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Login',
  data() {
    return {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      usernameLogin: '',
      passwordLogin: '',
      error: '',
      errorLogin: '',
    }
  },
  methods: {
    async register() {
      this.error = '';
      this.errorLogin = '';
      if (!this.firstName || !this.lastName || !this.username || !this.password)
        return;
      try {
        let response = await axios.post('/api/users', {
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          password: this.password,
        });
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.error = error.response.data.message;
        this.$root.$data.user = null;
      }
    },
    async login() {
      this.error = '';
      this.errorLogin = '';
      if (!this.usernameLogin || !this.passwordLogin)
        return;
      try {
        let response = await axios.post('/api/users/login', {
          username: this.usernameLogin,
          password: this.passwordLogin,
        });
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.errorLogin = "Error: " + error.response.data.message;
        this.$root.$data.user = null;
      }
    },
  }
}
</script>

<style scoped>
.space-above {
  margin-top: 50px;
}

h1 {
  font-size: 28px;
  font-variant: capitalize;
}

.wrapper {
  padding: 20px;
  display: flex;
  justify-content: center;
}

.wrapperBox {
  text-align: center;
}

.wrapper form {
  font-size: 14px;
}

.wrapper form legend {
  font-size: 20px;
}

.wrapper fieldset {
    border: none;
}

input {
  margin-right: 10px;
}

.error {
  margin-top: 10px;
  display: inline;
  padding: 5px 20px;
  border-radius: 30px;
  font-size: 10px;
  background-color: #d9534f;
  color: #fff;
}

.buttons {
        background-color: #2c3e50;
        border-radius: 0.25rem;
        color: whitesmoke;
        border: 1px solid #2c3e50;
    }
</style>
