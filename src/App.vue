<template>
<div id="#app">
 <meta name="google-signin-client_id" content="802692104431-nnmjavb8l1kkuspn9sm1efsilhvej35b.apps.googleusercontent.com">
  <button v-if="!signedIn" @click="triggerLogin" type="button" class="login-with-google-btn" >
    Sign in with Google
  </button>
  <div @click="triggerLogout" class="signout-button" v-if="signedIn">
      Sign out
  </div>
<router-view v-if=signedIn />
</div>
</template>

<script>
import {mapState, mapGetters, mapActions} from "vuex";
export default {
  name: 'App',
  components: {

  },
  computed: {
    ...mapGetters(['signedIn'])
  },
  methods: {
  ...mapActions(['login', 'setLoggedIn', 'logout']),
  triggerLogin() {
   this.$gapi.login().then(({ currentUser, gapi, hasGrantedScopes }) => {
      //console.log({ currentUser, gapi, hasGrantedScopes });
      this.login(this.$gapi.getUserData()).then( res => {
          console.log(this.userData);
          this.setLoggedIn();
            window.localStorage.setItem('signedIn','true');
          }
          );
        })
        .catch(err => console.log(err));
  },
  triggerLogout() {
      this.$gapi.logout()
      .then(res => {
        this.logout();
        window.localStorage.setItem('signedIn', 'false');

      })
    },
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
  margin-top: 60px;
  justify-content: center;
  display: flex;
}

.signout-button {
  display: block;
  width: 130px;
  height: 35px;
  background-color: #070e66;
  line-height: 35px; 
  cursor: pointer;
  color: white;
  font-family: Public Sans;
  font-style: normal;
  font-size: 13px;
  border-radius: 3px;
  margin-bottom: 10px;
}

.login-with-google-btn {
  transition: background-color .3s, box-shadow .3s;
  cursor: pointer;
    
  padding: 12px 16px 12px 42px;
  border: none;
  border-radius: 3px;
  box-shadow: 0 -1px 0 rgba(0, 0, 0, .04), 0 1px 1px rgba(0, 0, 0, .25);
  
  color: #757575;
  font-size: 14px;
  font-weight: 500;
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",sans-serif;
  
  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=);
  background-color: white;
  background-repeat: no-repeat;
  background-position: 12px 11px;
  
  &:hover {
    box-shadow: 0 -1px 0 rgba(0, 0, 0, .04), 0 2px 4px rgba(0, 0, 0, .25);
  }
  
  &:active {
    background-color: #eeeeee;
  }
  
  &:focus {
    outline: none;
    box-shadow: 
      0 -1px 0 rgba(0, 0, 0, .04),
      0 2px 4px rgba(0, 0, 0, .25),
      0 0 0 3px #c8dafc;
  }
}
</style>
